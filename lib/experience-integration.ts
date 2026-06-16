import { experienceApi } from "../api/experience";
import type { ExperienceSignalFlowFeedback, KnowledgeDocument, TradeSignal } from "./types";

/**
 * Experience Engine integration.
 *
 * Experience is feedback for the existing OMEGA loop. It does not create a
 * parallel decision pipeline and it does not train AI models.
 */
export async function prepareExperienceForSignalFlow(signal: TradeSignal): Promise<ExperienceSignalFlowFeedback> {
  const repository = experienceApi.getRepository();
  const records = await repository.search({
    query: signal.symbol,
    filter: { symbol: signal.symbol },
    limit: 5
  });
  const patterns = await repository.detectPatterns();
  const relatedPatterns = patterns.filter((pattern) => records.some((record) => record.patterns.includes(pattern.id)));
  const lessons = records.flatMap((record) => record.lessons);

  return {
    signalId: signal.id,
    symbol: signal.symbol,
    market: signal.market,
    experienceIds: records.map((record) => record.id),
    patternIds: relatedPatterns.map((pattern) => pattern.id),
    lessons,
    reasoning: "Experience feedback added to SignalFlow context without model retraining or parallel decisions.",
    appliedAt: new Date().toISOString()
  };
}

export async function enrichSignalWithExperience(signal: TradeSignal): Promise<TradeSignal> {
  const feedback = await prepareExperienceForSignalFlow(signal);
  const lessonText = feedback.lessons.map((lesson) => lesson.lesson).join(" ");

  return {
    ...signal,
    reasoning: `${signal.reasoning} Experience context: ${lessonText || "No direct prior experience; continue paper validation."}`
  };
}

export async function prepareExperienceKnowledgeUpdates(): Promise<KnowledgeDocument[]> {
  return experienceApi.prepareKnowledgeUpdates();
}
