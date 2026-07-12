const DATA_LABEL = "模拟数据 · Concept Demo";
const DATA_BOUNDARY =
  "仅用于生产测试方案演示，不代表任何企业实际质量水平";

const BATCHES = ["Batch A", "Batch B", "Batch C"];
const STATIONS = ["EOL-01", "EOL-02"];
const FIRMWARES = ["v2.4.0", "v2.4.1", "v2.5.0-rc"];
const MODULE_LOTS = {
  flightControl: ["SIM-FC-A1", "SIM-FC-A2", "SIM-FC-B1", "SIM-FC-B2"],
  power: ["SIM-PWR-A1", "SIM-PWR-A2", "SIM-PWR-B1"],
  perception: ["SIM-SEN-A1", "SIM-SEN-A2", "SIM-SEN-B1", "SIM-SEN-B2"],
};
const FAILURE_MODES = [
  "传感器健康检查异常",
  "通信握手不稳定",
  "电机响应一致性偏差",
  "振动指标超出演示限值",
  "安全功能自检未完成",
];

const STEP_DEFINITIONS = [
  {
    name: "SN / 版本核对",
    unit: "match",
    lowerLimit: 1,
    upperLimit: 1,
    nominal: 1,
  },
  {
    name: "上电自检",
    unit: "check",
    lowerLimit: 1,
    upperLimit: 1,
    nominal: 1,
  },
  {
    name: "电源 / 通信检查",
    unit: "ms",
    lowerLimit: 0,
    upperLimit: 120,
    nominal: 72,
  },
  {
    name: "传感器健康检查",
    unit: "deg",
    lowerLimit: 0,
    upperLimit: 0.5,
    nominal: 0.24,
  },
  {
    name: "ESC / 电机响应",
    unit: "%",
    lowerLimit: 0,
    upperLimit: 8,
    nominal: 4.2,
  },
  {
    name: "振动 / 日志检查",
    unit: "mm/s",
    lowerLimit: 0,
    upperLimit: 4.5,
    nominal: 2.7,
  },
  {
    name: "安全功能检查",
    unit: "%",
    lowerLimit: 100,
    upperLimit: 100,
    nominal: 100,
  },
];

const LAST_STEP_ELAPSED_SEC = STEP_DEFINITIONS.reduce(
  (elapsedSec, _definition, index) => elapsedSec + 25 + index * 7,
  0,
);

const FAILURE_STEP_BY_MODE = new Map([
  [FAILURE_MODES[0], 4],
  [FAILURE_MODES[1], 3],
  [FAILURE_MODES[2], 5],
  [FAILURE_MODES[3], 6],
  [FAILURE_MODES[4], 7],
]);

const FAILURE_BY_INDEX = new Map([
  [14, FAILURE_MODES[0]],
  [34, FAILURE_MODES[1]],
  [42, FAILURE_MODES[2]],
  [65, FAILURE_MODES[4]],
  [85, FAILURE_MODES[0]],
  [91, FAILURE_MODES[0]],
  [97, FAILURE_MODES[3]],
  [103, FAILURE_MODES[3]],
  [117, FAILURE_MODES[2]],
  [150, FAILURE_MODES[3]],
  [168, FAILURE_MODES[0]],
  [180, FAILURE_MODES[2]],
  [201, FAILURE_MODES[1]],
  [222, FAILURE_MODES[2]],
  [230, FAILURE_MODES[4]],
]);

const UNRESOLVED_INDEXES = new Set([91, 117, 201, 230]);

function createLcg(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1_664_525, state) + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function demoTimestamp(day, elapsedSec) {
  const secondsFromMidnight = 8 * 60 * 60 + elapsedSec;
  const hours = Math.floor(secondsFromMidnight / 3_600);
  const minutes = Math.floor((secondsFromMidnight % 3_600) / 60);
  const seconds = secondsFromMidnight % 60;
  return `DEMO-DAY-${pad(day)}T${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function measuredValue(definition, random, isFailed) {
  if (isFailed) {
    if (definition.lowerLimit === definition.upperLimit) return 0;
    return Number((definition.upperLimit * 1.35).toFixed(2));
  }

  if (definition.lowerLimit === definition.upperLimit) {
    return definition.nominal;
  }

  const variation = (random() - 0.5) * definition.nominal * 0.18;
  return Number((definition.nominal + variation).toFixed(2));
}

function buildSteps({ sn, day, startOffsetSec, failureMode, retest, random }) {
  const failedSequence = FAILURE_STEP_BY_MODE.get(failureMode);
  let stepOffsetSec = 0;

  return STEP_DEFINITIONS.map((definition, index) => {
    const sequence = index + 1;
    const isFailed = sequence === failedSequence;
    stepOffsetSec += 25 + index * 7;

    return {
      stepId: `${sn}-STEP-${pad(sequence)}`,
      sequence,
      name: definition.name,
      measurement: measuredValue(definition, random, isFailed),
      unit: definition.unit,
      lowerLimit: definition.lowerLimit,
      upperLimit: definition.upperLimit,
      result: isFailed ? "Fail" : "Pass",
      firstResult: isFailed ? "Fail" : "Pass",
      retestResult: isFailed ? retest?.result ?? null : null,
      programVersion: "EOL-DEMO-1.0",
      timestamp: demoTimestamp(day, startOffsetSec + stepOffsetSec),
    };
  });
}

function buildRecords() {
  const random = createLcg(2_026_071_1);

  return Array.from({ length: 240 }, (_, index) => {
    const sn = `DEMO-UAV-${String(index + 1).padStart(4, "0")}`;
    const day = Math.floor(index / 24) + 1;
    const startOffsetSec = (index % 24) * 15 * 60;
    const failureMode = FAILURE_BY_INDEX.get(index) ?? null;
    const firstPass = failureMode === null;
    const unresolved = UNRESOLVED_INDEXES.has(index);
    const generatedCycleTimeSec =
      index % 10 === 0
        ? 390 + Math.floor(random() * 21)
        : 320 + Math.floor(random() * 58);
    const cycleTimeSec = Math.max(
      LAST_STEP_ELAPSED_SEC,
      generatedCycleTimeSec,
    );
    const retest = firstPass
      ? null
      : {
          attempt: 2,
          timestamp: demoTimestamp(day, startOffsetSec + cycleTimeSec + 15 * 60),
          reason: "首次失效后受控工程复测",
          action: unresolved
            ? "隔离并等待工程确认"
            : "隔离后工程核查并局部复测",
          scope: "局部复测",
          result: unresolved ? "Fail" : "Pass",
        };
    const riskScore = firstPass
      ? Number((0.08 + random() * 0.34).toFixed(2))
      : Number((0.68 + random() * 0.28).toFixed(2));

    return {
      sn,
      batch: BATCHES[Math.floor(index / 80)],
      station: STATIONS[index % STATIONS.length],
      firmware: FIRMWARES[index % FIRMWARES.length],
      moduleLots: {
        flightControl:
          MODULE_LOTS.flightControl[index % MODULE_LOTS.flightControl.length],
        power: MODULE_LOTS.power[Math.floor(index / 2) % MODULE_LOTS.power.length],
        perception:
          MODULE_LOTS.perception[
            Math.floor(index / 3) % MODULE_LOTS.perception.length
          ],
      },
      timestamp: demoTimestamp(day, startOffsetSec),
      cycleTimeSec,
      firstPass,
      retest,
      status: firstPass || !unresolved ? "演示放行" : "待工程确认",
      failureMode,
      riskScore,
      steps: buildSteps({
        sn,
        day,
        startOffsetSec,
        failureMode,
        retest,
        random,
      }),
    };
  });
}

function nearestRankP95(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.ceil(sorted.length * 0.95) - 1];
}

export const records = buildRecords();

const firstPassCount = records.filter((record) => record.firstPass).length;
const retestCount = records.filter((record) => record.retest !== null).length;
const finalPassCount = records.filter(
  (record) => record.status === "演示放行",
).length;

export const summary = {
  dataLabel: DATA_LABEL,
  dataBoundary: DATA_BOUNDARY,
  total: records.length,
  firstPassCount,
  finalPassCount,
  retestCount,
  fpy: firstPassCount / records.length,
  finalYield: finalPassCount / records.length,
  retestRate: retestCount / records.length,
  p95CycleTimeSec: nearestRankP95(
    records.map((record) => record.cycleTimeSec),
  ),
};

const totalFailures = records.length - firstPassCount;
const failureCounts = new Map(
  FAILURE_MODES.map((failureMode) => [
    failureMode,
    records.filter((record) => record.failureMode === failureMode).length,
  ]),
);

let cumulativeCount = 0;
export const failurePareto = [...failureCounts]
  .map(([failureMode, count], order) => ({ failureMode, count, order }))
  .sort((left, right) => right.count - left.count || left.order - right.order)
  .map(({ failureMode, count }) => {
    cumulativeCount += count;
    return {
      failureMode,
      count,
      rate: count / totalFailures,
      cumulativeRate: cumulativeCount / totalFailures,
    };
  });

const recordsBySn = new Map(records.map((record) => [record.sn, record]));

export function getRecordBySn(sn) {
  return recordsBySn.get(sn);
}
