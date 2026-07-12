import { records, summary, failurePareto, getRecordBySn } from "./data.mjs";

const ROUTES = {
  "#overview": { title: "生产质量总览", viewId: "overview-view" },
  "#failures": { title: "失效分析", viewId: "failures-view" },
  "#trace": { title: "SN 追溯", viewId: "trace-view" },
};

const DEMO_CLUSTER = {
  batch: "Batch B",
  station: "EOL-02",
  firmware: "v2.4.1",
  failureMode: "传感器健康检查异常",
  sn: "DEMO-UAV-0086",
};

const state = {
  filters: { day: "all", batch: "all", station: "all" },
  failureMode: DEMO_CLUSTER.failureMode,
  selectedSn: DEMO_CLUSTER.sn,
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPercent(value, digits = 1) {
  return `${(value * 100).toFixed(digits)}%`;
}

function currentFiltersFromDom() {
  if (typeof document === "undefined") return state.filters;
  return {
    day: document.querySelector("#day-filter")?.value ?? "all",
    batch: document.querySelector("#batch-filter")?.value ?? "all",
    station: document.querySelector("#station-filter")?.value ?? "all",
  };
}

export function applyFilters(filters = {}) {
  const merged = { day: "all", batch: "all", station: "all", ...filters };
  return records.filter((record) => {
    const dayMatches =
      merged.day === "all" || record.timestamp.startsWith(`${merged.day}T`);
    const batchMatches = merged.batch === "all" || record.batch === merged.batch;
    const stationMatches =
      merged.station === "all" || record.station === merged.station;
    return dayMatches && batchMatches && stationMatches;
  });
}

function nearestRankP95(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.ceil(sorted.length * 0.95) - 1];
}

function metricsFor(filtered) {
  const total = filtered.length;
  const firstPass = filtered.filter((record) => record.firstPass).length;
  const retested = filtered.filter((record) => record.retest).length;
  const risks = hasDemoRiskSignal(filtered) ? 1 : 0;
  return {
    total,
    fpy: total ? firstPass / total : 0,
    retestRate: total ? retested / total : 0,
    p95: nearestRankP95(filtered.map((record) => record.cycleTimeSec)),
    risks,
  };
}

function demoRiskRecords(filtered) {
  return filtered.filter(
    (record) =>
      record.batch === DEMO_CLUSTER.batch &&
      record.station === DEMO_CLUSTER.station &&
      record.firmware === DEMO_CLUSTER.firmware &&
      !record.firstPass &&
      record.failureMode === DEMO_CLUSTER.failureMode,
  );
}

function hasDemoRiskSignal(filtered) {
  return demoRiskRecords(filtered).length >= 2;
}

function dayKey(record) {
  return record.timestamp.slice(0, "DEMO-DAY-00".length);
}

function trendSeries(filtered) {
  return Array.from({ length: 10 }, (_, index) => {
    const day = `DEMO-DAY-${String(index + 1).padStart(2, "0")}`;
    const group = filtered.filter((record) => dayKey(record) === day);
    return { day: index + 1, ...metricsFor(group) };
  });
}

function trendSvg(series) {
  const width = 760;
  const height = 300;
  const plot = { left: 56, top: 26, width: 668, height: 220 };
  const valid = series.filter((item) => item.total > 0);
  if (!valid.length) return '<div class="chart-empty">当前筛选无测试记录，请清除或调整筛选。</div>';
  const x = (day) => plot.left + ((day - 1) / 9) * plot.width;
  const fpyMin = Math.max(0, Math.floor((Math.min(...valid.map((item) => item.fpy)) - 0.05) * 20) / 20);
  const cycleMin = Math.max(0, Math.min(...valid.map((item) => item.p95)) - 20);
  const cycleMax = Math.max(cycleMin + 60, Math.max(...valid.map((item) => item.p95)) + 20);
  const fpyY = (value) => plot.top + (1 - (value - fpyMin) / Math.max(0.01, 1 - fpyMin)) * plot.height;
  const cycleY = (value) => plot.top + ((cycleMax - value) / (cycleMax - cycleMin)) * plot.height;
  const points = valid.map((item) => `${x(item.day)},${fpyY(item.fpy)}`).join(" ");
  const cyclePoints = valid
    .map((item) => `${x(item.day)},${cycleY(item.p95)}`)
    .join(" ");
  const verticals = series
    .map(
      (item, index) =>
        `<line x1="${x(item.day)}" y1="${plot.top}" x2="${x(item.day)}" y2="${plot.top + plot.height}" class="gridline" />`,
    )
    .join("");
  const labels = series
    .map(
      (item, index) =>
        `<text x="${x(item.day)}" y="${height - 18}" class="axis-label" text-anchor="middle">D${item.day}</text>`,
    )
    .join("");
  const fpyDots = series
    .filter((item) => item.total > 0)
    .map(
      (item) =>
        `<circle cx="${x(item.day)}" cy="${fpyY(item.fpy)}" r="4" class="series-dot-fpy"><title>Day ${item.day} FPY ${formatPercent(item.fpy)}</title></circle>`,
    )
    .join("");
  const cycleDots = series
    .filter((item) => item.total > 0)
    .map(
      (item) =>
        `<rect x="${x(item.day) - 3}" y="${cycleY(item.p95) - 3}" width="6" height="6" class="series-dot-cycle"><title>Day ${item.day} P95 ${(item.p95 / 60).toFixed(2)} min</title></rect>`,
    )
    .join("");

  const fpyMid = (fpyMin + 1) / 2;
  const cycleMid = (cycleMin + cycleMax) / 2;
  return `<svg class="trend-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Day 1 至 Day 10 FPY 与 P95 测试节拍趋势">
    <title>FPY 与 P95 测试节拍趋势</title>
    <desc>左轴为首次通过率百分比，右轴为 P95 测试节拍分钟。</desc>
    ${verticals}
    <line x1="${plot.left}" y1="${plot.top + plot.height}" x2="${plot.left + plot.width}" y2="${plot.top + plot.height}" class="axis-line" />
    <text x="8" y="18" class="axis-unit">FPY %</text>
    <text x="${width - 8}" y="18" class="axis-unit" text-anchor="end">P95 min</text>
    <text x="${plot.left - 8}" y="${plot.top + 4}" class="axis-label" text-anchor="end">100%</text>
    <text x="${plot.left - 8}" y="${fpyY(fpyMid) + 4}" class="axis-label" text-anchor="end">${formatPercent(fpyMid, 0)}</text>
    <text x="${plot.left - 8}" y="${plot.top + plot.height}" class="axis-label" text-anchor="end">${formatPercent(fpyMin, 0)}</text>
    <text x="${plot.left + plot.width + 8}" y="${plot.top + 4}" class="axis-label">${(cycleMax / 60).toFixed(1)}</text>
    <text x="${plot.left + plot.width + 8}" y="${cycleY(cycleMid) + 4}" class="axis-label">${(cycleMid / 60).toFixed(1)}</text>
    <text x="${plot.left + plot.width + 8}" y="${plot.top + plot.height}" class="axis-label">${(cycleMin / 60).toFixed(1)}</text>
    <polyline points="${points}" class="series-line-fpy" />
    <polyline points="${cyclePoints}" class="series-line-cycle" />
    ${fpyDots}${cycleDots}${labels}
  </svg>`;
}

function kpiCard(label, value, detail, variant = "") {
  return `<article class="kpi-card ${variant}">
    <span class="kpi-label">${escapeHtml(label)}</span>
    <div><strong>${escapeHtml(value)}</strong><small>${escapeHtml(detail)}</small></div>
  </article>`;
}

function stationMatrix(filtered) {
  const rows = ["Batch A", "Batch B", "Batch C"]
    .map((batch) => {
      const cells = ["EOL-01", "EOL-02"]
        .map((station) => {
          const group = filtered.filter(
            (record) => record.batch === batch && record.station === station,
          );
          const metric = metricsFor(group);
          const investigate =
            group.length > 0 &&
            batch === DEMO_CLUSTER.batch &&
            station === DEMO_CLUSTER.station &&
            hasDemoRiskSignal(filtered);
          const fpy = group.length ? formatPercent(metric.fpy) : "—";
          const retest = group.length ? formatPercent(metric.retestRate) : "—";
          return `<td class="${investigate ? "matrix-investigate" : ""}">
            <strong>${fpy}</strong><span>复测 ${retest}</span>
          </td>`;
        })
        .join("");
      return `<tr><th scope="row">${batch}</th>${cells}</tr>`;
    })
    .join("");
  return `<table class="matrix-table"><thead><tr><th>批次</th><th>EOL-01</th><th>EOL-02</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function mount(viewId, markup) {
  if (typeof document === "undefined") return markup;
  const element = document.querySelector(`#${viewId}`);
  if (element) element.innerHTML = markup;
  return markup;
}

export function renderOverview(filters = currentFiltersFromDom()) {
  state.filters = { ...state.filters, ...filters };
  const filtered = applyFilters(state.filters);
  const metric = metricsFor(filtered);
  const riskRecords = demoRiskRecords(filtered);
  const hasRisk = hasDemoRiskSignal(filtered);
  const markup = `<div class="view-layout-overview">
    <section class="kpi-grid" aria-label="关键生产指标">
      ${kpiCard("投入数", metric.total, "唯一 SN")}
      ${kpiCard("FPY", formatPercent(metric.fpy, 2), "首次通过率")}
      ${kpiCard("P95 测试节拍", `${(metric.p95 / 60).toFixed(2)} min`, "nearest-rank")}
      ${kpiCard("复测率", formatPercent(metric.retestRate, 2), "不等于误判率")}
      ${kpiCard("待调查信号", metric.risks, "非确认缺陷", "kpi-investigate")}
    </section>
    <section class="overview-main">
      <article class="panel trend-panel">
        <header class="panel-header"><div><h2>FPY 与 P95 节拍趋势</h2><p>演示周期 Day 1–10</p></div><div class="legend"><span class="legend-fpy">FPY</span><span class="legend-cycle">P95 min</span></div></header>
        ${trendSvg(trendSeries(filtered))}
      </article>
      <div class="overview-rail">
        <article class="panel matrix-panel">
          <header class="panel-header"><div><h2>批次 × 工站</h2><p>FPY / 复测率</p></div></header>
          ${stationMatrix(filtered)}
        </article>
        <article class="risk-panel ${hasRisk ? "" : "risk-panel-neutral"}" aria-labelledby="risk-title">
          <div class="risk-stripe" aria-hidden="true"></div>
          <div class="risk-copy">
            <span class="risk-kicker">${hasRisk ? "调查优先级信号 01" : "当前筛选状态"}</span>
            <h2 id="risk-title">${hasRisk ? "Batch B · v2.4.1 · EOL-02 出现聚集" : "未触发预置聚类信号"}</h2>
            <p>${hasRisk ? "传感器健康首次失效在该组合中聚集，建议先核查夹具、标定与版本交互。" : "请调整时间、批次或工站筛选；无信号不等于无质量风险。"}</p>
            <div class="risk-meta"><span>证据 ${riskRecords.length} SN</span><span>置信度：${hasRisk ? "低" : "不适用"}</span></div>
          </div>
          <button class="button button-primary" type="button" data-action="risk-evidence" ${hasRisk ? "" : "disabled"}>查看证据</button>
        </article>
      </div>
    </section>
  </div>`;
  return mount("overview-view", markup);
}

function paretoFor(filtered) {
  const firstFails = filtered.filter((record) => !record.firstPass);
  let cumulative = 0;
  const total = firstFails.length || 1;
  return failurePareto
    .map((item) => {
    const count = firstFails.filter((record) => record.failureMode === item.failureMode).length;
      return { ...item, count };
    })
    .sort((left, right) => right.count - left.count || left.failureMode.localeCompare(right.failureMode, "zh-CN"))
    .map((item) => {
      cumulative += item.count;
      return { ...item, cumulativeRate: cumulative / total };
    });
}

function paretoButtons(items) {
  const max = Math.max(...items.map((item) => item.count), 1);
  return items
    .map((item) => {
      const active = item.failureMode === state.failureMode;
      const width = 420;
      const barWidth = (item.count / max) * 250;
      return `<button class="pareto-row ${active ? "is-selected" : ""}" type="button" data-failure-mode="${escapeHtml(item.failureMode)}" aria-pressed="${active}">
        <span class="pareto-name">${escapeHtml(item.failureMode)}</span>
        <svg viewBox="0 0 ${width} 30" aria-hidden="true">
          <rect x="0" y="6" width="250" height="18" class="pareto-track" />
          <rect x="0" y="6" width="${barWidth}" height="18" class="pareto-bar" />
          <line x1="${item.cumulativeRate * 250}" y1="3" x2="${item.cumulativeRate * 250}" y2="27" class="pareto-cumulative-marker" />
          <text x="268" y="20" class="pareto-value">${item.count} SN</text>
          <text x="410" y="20" class="pareto-cumulative" text-anchor="end">累计 ${formatPercent(item.cumulativeRate, 0)}</text>
        </svg>
      </button>`;
    })
    .join("");
}

function affectedRecords(filtered) {
  return filtered.filter((record) => record.failureMode === state.failureMode);
}

function countBy(rows, field) {
  return [...rows.reduce((counts, row) => counts.set(row[field], (counts.get(row[field]) ?? 0) + 1), new Map())]
    .sort((left, right) => right[1] - left[1] || String(left[0]).localeCompare(String(right[0]), "zh-CN"));
}

function failureTrend(rows) {
  const counts = Array.from({ length: 10 }, (_, index) => {
    const day = `DEMO-DAY-${String(index + 1).padStart(2, "0")}`;
    return rows.filter((record) => dayKey(record) === day).length;
  });
  const max = Math.max(...counts, 1);
  return `<div class="mini-trend" aria-label="所选失效 Day 1 至 Day 10 发生次数">${counts
    .map((count, index) => `<span><i style="height:${Math.max(3, (count / max) * 34)}px" title="Day ${index + 1}: ${count} SN"></i><small>D${index + 1}</small></span>`)
    .join("")}</div>`;
}

function associationDistribution(rows) {
  const groups = [
    ["批次", countBy(rows, "batch")],
    ["工站", countBy(rows, "station")],
    ["固件", countBy(rows, "firmware")],
  ];
  return `<div class="association-grid">${groups
    .map(([label, entries]) => `<div><b>${label}</b><span>${entries.length ? entries.map(([name, count]) => `${escapeHtml(name)} ${count}`).join(" · ") : "无样本"}</span></div>`)
    .join("")}</div>`;
}

const CHECKS_BY_MODE = {
  "传感器健康检查异常": "复核传感器标定、夹具姿态、版本变更与原始测试日志。",
  "通信握手不稳定": "复核接口连接、通信负载、固件变更与超时日志。",
  "电机响应一致性偏差": "复核动力模组批次、工装负载、供电和响应曲线。",
  "振动指标超出演示限值": "复核夹具约束、动力模组批次、桨/电机状态与频谱日志。",
  "安全功能自检未完成": "复核测试前置条件、状态机、固件配置和故障注入记录。",
};

function affectedTable(rows) {
  const body = rows.slice(0, 8).map((record) => `<tr>
    <td><button class="link-button" type="button" data-sn="${record.sn}">${record.sn}</button></td>
    <td>${record.batch}</td><td>${record.station}</td><td>${record.firmware}</td>
    <td>${escapeHtml(record.failureMode)}</td>
    <td>${record.retest ? escapeHtml(record.retest.result) : "—"}</td>
    <td><span class="status status-${record.status === "演示放行" ? "pass" : "investigate"}">${escapeHtml(record.status)}</span></td>
  </tr>`).join("");
  return `<table class="data-table"><caption>所选失效模式的受影响整机及复测状态</caption><thead><tr><th>SN</th><th>批次</th><th>工站</th><th>固件</th><th>首次失效</th><th>复测</th><th>当前状态</th></tr></thead><tbody>${body || '<tr><td colspan="7" class="empty-cell">当前筛选范围内无受影响 SN</td></tr>'}</tbody></table>`;
}

export function renderFailures(filters = currentFiltersFromDom()) {
  state.filters = { ...state.filters, ...filters };
  const filtered = applyFilters(state.filters);
  const pareto = paretoFor(filtered);
  const affected = affectedRecords(filtered);
  const comparisonSize = Math.max(0, filtered.length - affected.length);
  const dominant = [countBy(affected, "batch")[0], countBy(affected, "station")[0], countBy(affected, "firmware")[0]]
    .filter(Boolean)
    .map(([name, count]) => `${escapeHtml(name)}（${count}）`)
    .join("、");
  const confidence = affected.length >= 3 ? "中" : "低";
  const markup = `<div class="view-layout-failures">
    <article class="panel pareto-panel">
      <header class="panel-header"><div><h2>首次失效 Pareto</h2><p>点击失效模式联动证据</p></div><button class="button button-secondary" type="button" data-action="clear-failure">清除选择</button></header>
      <div class="pareto-list">${paretoButtons(pareto)}</div>
    </article>
    <section class="failure-evidence">
      <div class="failure-context">
        <article class="panel mini-panel"><header><h2>所选失效趋势</h2><span>首次失败 SN / Day</span></header>${failureTrend(affected)}</article>
        <article class="panel mini-panel"><header><h2>关联分布</h2><span>描述性计数，不代表因果</span></header>${associationDistribution(affected)}</article>
      </div>
      <article class="panel table-panel"><header class="panel-header"><div><h2>受影响 SN</h2><p>${escapeHtml(state.failureMode)} · ${affected.length} 条</p></div></header>${affectedTable(affected)}</article>
      <aside class="ai-evidence" aria-labelledby="ai-title">
        <header><div><span>AI 辅助诊断</span><h2 id="ai-title">${escapeHtml(state.failureMode)} · 调查提示</h2></div><span class="confidence">置信度：${confidence}</span></header>
        <dl>
          <div><dt>证据</dt><dd>${affected.length} 个首次失败 SN；当前筛选内另有 ${comparisonSize} 个对照 SN。</dd></div>
          <div><dt>观察</dt><dd>${dominant ? `主要分布：${dominant}` : "当前筛选无相关样本"}；这是相关描述，不是根因结论。</dd></div>
          <div><dt>建议核查</dt><dd>${CHECKS_BY_MODE[state.failureMode] ?? "复核测试日志、配置变更、工装与物料批次。"}</dd></div>
        </dl>
        <p class="ai-boundary">仅供调查优先级参考，不参与安全放行</p>
        <p class="ai-boundary-secondary">仅供工程调查，不得用于自动放行或跳过既定测试。</p>
      </aside>
    </section>
  </div>`;
  return mount("failures-view", markup);
}

function statusForStep(step) {
  if (step.firstResult === "Fail" && step.retestResult === "Pass") return "复测通过";
  if (step.firstResult === "Fail") return "Fail - 需调查";
  return "Pass";
}

function traceTimeline(record) {
  return record.steps.map((step) => {
    const status = statusForStep(step);
    const className = status === "Pass" ? "pass" : status === "复测通过" ? "retest" : "investigate";
    return `<details class="trace-step ${className}" ${step.firstResult === "Fail" ? "open" : ""}>
      <summary><span class="step-number">${step.sequence}</span><span class="step-name">${escapeHtml(step.name)}</span><span class="status status-${className}">${status}</span></summary>
      <div class="step-detail">
        <span><b>模拟测量</b>${escapeHtml(step.measurement)} ${escapeHtml(step.unit)}</span>
        <span><b>演示限值</b>${escapeHtml(step.lowerLimit)}–${escapeHtml(step.upperLimit)} ${escapeHtml(step.unit)}</span>
        <span><b>首次判定</b>${escapeHtml(step.firstResult)}</span>
        <span><b>复测判定</b>${escapeHtml(step.retestResult ?? "—")}</span>
        <span><b>程序版本</b>${escapeHtml(step.programVersion)}</span>
        <span><b>模拟工装</b>SIM-${escapeHtml(record.station)}-FIX-01</span>
        <span><b>证据时间</b>${escapeHtml(step.timestamp)}</span>
      </div>
    </details>`;
  }).join("");
}

export function renderTrace(sn = state.selectedSn) {
  state.selectedSn = sn || DEMO_CLUSTER.sn;
  const record = getRecordBySn(state.selectedSn);
  const body = !record
    ? `<div class="trace-error" role="alert"><h2>未找到该模拟 SN</h2><p>请输入如 ${DEMO_CLUSTER.sn} 的完整编号。</p></div>`
    : `<div class="trace-content">
      <article class="identity-panel panel">
        <header class="panel-header"><div><h2>${record.sn}</h2><p>身份—配置—测试—处置证据链</p></div><span class="status status-${record.status === "演示放行" ? "pass" : "investigate"}">${record.status}</span></header>
        <dl class="identity-grid">
          <div><dt>批次 / 工站</dt><dd>${record.batch} · ${record.station}</dd></div>
          <div><dt>固件</dt><dd>${record.firmware}</dd></div>
          <div><dt>飞控模组</dt><dd>${record.moduleLots.flightControl}</dd></div>
          <div><dt>动力模组</dt><dd>${record.moduleLots.power}</dd></div>
          <div><dt>感知模组</dt><dd>${record.moduleLots.perception}</dd></div>
          <div><dt>首次测试</dt><dd>${record.timestamp}</dd></div>
        </dl>
      </article>
      <section class="trace-grid">
        <article class="panel timeline-panel"><header class="panel-header"><div><h2>七步测试时间线</h2><p>点击任一步骤查看测量与程序证据</p></div></header><div class="timeline">${traceTimeline(record)}</div></article>
        <aside class="disposition-panel">
          <h2>处置与复测</h2>
          ${record.retest ? `<ol><li><b>首次失败 · ${escapeHtml(record.timestamp)}</b><span>${escapeHtml(record.failureMode)}</span></li><li><b>隔离与核查 · 测试/制造工程角色</b><span>${escapeHtml(record.retest.action)}</span></li><li><b>${record.retest.scope} · ${escapeHtml(record.retest.timestamp)}</b><span>结果：${record.retest.result}</span></li></ol>` : '<p class="empty-note">首次完整 EOL 按演示规则通过，无复测记录。</p>'}
          <p class="limit-note">演示放行仅表示满足本概念规则，不代表飞行安全合格。</p>
        </aside>
      </section>
    </div>`;

  if (typeof document !== "undefined") {
    const view = document.querySelector("#trace-view");
    const form = view?.querySelector("#sn-search-form");
    view?.querySelector(".trace-content, .trace-error")?.remove();
    form?.insertAdjacentHTML("afterend", body);
    const input = document.querySelector("#sn-search-input");
    if (input && record) input.value = record.sn;
  }
  return body;
}

function routeFromHash() {
  if (typeof window === "undefined") return "#overview";
  const base = window.location.hash.split("?")[0];
  return ROUTES[base] ? base : "#overview";
}

function syncRoute() {
  if (typeof document === "undefined") return;
  const route = routeFromHash();
  const config = ROUTES[route];
  document.querySelectorAll(".view").forEach((view) => {
    view.hidden = view.id !== config.viewId;
  });
  document.querySelectorAll("[data-route]").forEach((button) => {
    const active = button.dataset.route === route;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  document.querySelector("#page-title").textContent = config.title;
  if (route === "#overview") renderOverview();
  if (route === "#failures") renderFailures();
  if (route === "#trace") renderTrace();
  document.querySelector("#app-main")?.focus({ preventScroll: true });
}

function setSelect(id, value) {
  const element = document.querySelector(id);
  if (element) element.value = value;
}

function bindEvents() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.hash = button.dataset.route;
    });
  });
  document.querySelector("#global-filters")?.addEventListener("change", () => {
    state.filters = currentFiltersFromDom();
    syncRoute();
  });
  document.querySelector("#app-main")?.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.dataset.action === "risk-evidence") {
      setSelect("#batch-filter", DEMO_CLUSTER.batch);
      setSelect("#station-filter", DEMO_CLUSTER.station);
      state.filters = currentFiltersFromDom();
      state.failureMode = DEMO_CLUSTER.failureMode;
      window.location.hash = "#failures";
    }
    if (target.dataset.failureMode) {
      state.failureMode = target.dataset.failureMode;
      renderFailures();
    }
    if (target.dataset.sn) {
      state.selectedSn = target.dataset.sn;
      window.location.hash = "#trace";
    }
    if (target.dataset.action === "clear-failure") {
      state.failureMode = DEMO_CLUSTER.failureMode;
      setSelect("#day-filter", "all");
      setSelect("#batch-filter", "all");
      setSelect("#station-filter", "all");
      state.filters = currentFiltersFromDom();
      renderFailures();
    }
  });
  document.querySelector("#sn-search-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = document.querySelector("#sn-search-input")?.value.trim();
    renderTrace(value);
  });
  const dialog = document.querySelector("#metrics-dialog");
  document.querySelector("#metrics-button")?.addEventListener("click", () => dialog?.showModal());
  document.querySelector("#metrics-close")?.addEventListener("click", () => dialog?.close());
  window.addEventListener("hashchange", syncRoute);
}

function init() {
  bindEvents();
  if (!window.location.hash) window.location.hash = "#overview";
  syncRoute();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}
