import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GameCard } from "./GameCard";
import { SUBDOMAIN_OPTIONS } from "../utils/subdomains";
import {
  recommend,
  Difficulty,
  TimeBucket,
  FinderCriteria,
  RecommendReason,
} from "../utils/recommend";
import { Game } from "../utils/types/Game";

const TIME_OPTIONS: { value: TimeBucket; key: string }[] = [
  { value: "lt30", key: "games.finder.time_lt30" },
  { value: "30-60", key: "games.finder.time_30_60" },
  { value: "60-120", key: "games.finder.time_60_120" },
  { value: "gt120", key: "games.finder.time_gt120" },
];

const DIFF_OPTIONS: { value: Difficulty; key: string }[] = [
  { value: "easy", key: "games.finder.diff_easy" },
  { value: "medium", key: "games.finder.diff_medium" },
  { value: "hard", key: "games.finder.diff_hard" },
];

const PLAYER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
const TOTAL_STEPS = 4; // 0:players 1:time 2:difficulty 3:type
const TYPE_STEP = 3;
const PREVIEW_COUNT = 9;

const chipClass = (active: boolean) =>
  `px-3 h-9 rounded-full font-body text-sm border transition-colors ${
    active
      ? "bg-dv-red text-white border-dv-red"
      : "bg-white text-dv-black border-black/10 hover:border-dv-red-light"
  }`;

const anyChipClass =
  "px-3 h-9 rounded-full font-body text-sm border border-dashed border-black/20 text-dv-gray-600 hover:border-dv-red-light hover:text-dv-black transition-colors bg-white";

export function GameFinderModal({
  games,
  open,
  onClose,
}: {
  games: Game[];
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [players, setPlayers] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<TimeBucket[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty[]>([]);
  const [subs, setSubs] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [flippedId, setFlippedId] = useState<string | number | null>(null);

  const reset = () => {
    setStep(0);
    setDone(false);
    setShowAll(false);
    setFlippedId(null);
    setPlayers(undefined);
    setTime([]);
    setDifficulty([]);
    setSubs([]);
  };

  // Modal her açıldığında temiz başla
  useEffect(() => {
    if (open) reset();
  }, [open]);

  const criteria: FinderCriteria = useMemo(() => {
    const categories = SUBDOMAIN_OPTIONS.filter((o) => subs.includes(o.id)).flatMap(
      (o) => o.categoryIds ?? [],
    );
    return {
      players,
      time: time.length > 0 ? time : undefined,
      difficulty: difficulty.length > 0 ? difficulty : undefined,
      subdomains: subs,
      categories,
    };
  }, [players, time, difficulty, subs]);

  const results = useMemo(
    () => (done ? recommend(games, criteria) : []),
    [done, games, criteria],
  );

  if (!open) return null;

  const goNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else setDone(true);
  };

  const goBack = () => {
    if (done) {
      setDone(false);
      setStep(TOTAL_STEPS - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const toggleTime = (val: TimeBucket) =>
    setTime((cur) => (cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val]));

  const toggleDiff = (val: Difficulty) =>
    setDifficulty((cur) => (cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val]));

  const toggleSub = (id: number) =>
    setSubs((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const reasonLabel = (reason?: RecommendReason): string | undefined => {
    if (!reason) return undefined;
    if (reason.kind === "bestAt")
      return t("games.finder.reasonBestAt", { count: reason.players });
    if (reason.kind === "time")
      return t("games.finder.reasonTime", { count: reason.minutes });
    return t(`games.finder.diff_${reason.difficulty}`);
  };

  const summaryParts: string[] = [];
  if (players !== undefined)
    summaryParts.push(t("games.finder.playersSummary", { count: players }));
  if (time.length > 0)
    summaryParts.push(time.map((v) => t(TIME_OPTIONS.find((o) => o.value === v)!.key)).join(", "));
  if (difficulty.length > 0)
    summaryParts.push(difficulty.map((d) => t(`games.finder.diff_${d}`)).join(", "));
  if (subs.length)
    summaryParts.push(
      subs
        .map((id) => t(SUBDOMAIN_OPTIONS.find((o) => o.id === id)!.labelKey))
        .join(", "),
    );

  const visible = showAll ? results : results.slice(0, PREVIEW_COUNT);

  const stepHeader = (text: string, multi: boolean) => (
    <>
      <p className="font-display font-semibold text-dv-black-deep text-lg leading-tight mb-1">
        {text}
      </p>
      <p className="font-body text-dv-gray-600 text-xs mb-4">
        {t(multi ? "games.finder.hintMulti" : "games.finder.hintSingle")}
      </p>
    </>
  );

  const renderStep = () => {
    if (step === 0)
      return (
        <div>
          {stepHeader(t("games.finder.players"), false)}
          <div className="flex flex-wrap gap-1.5">
            {PLAYER_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setPlayers(n);
                  goNext();
                }}
                className={`h-10 w-10 rounded-full font-body text-sm border transition-colors ${
                  players === n
                    ? "bg-dv-red text-white border-dv-red"
                    : "bg-white text-dv-black border-black/10 hover:border-dv-red-light"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      );

    if (step === 1)
      return (
        <div>
          {stepHeader(t("games.finder.time"), true)}
          <div className="flex flex-wrap gap-1.5">
            {TIME_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => toggleTime(o.value)}
                className={chipClass(time.includes(o.value))}
              >
                {t(o.key)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setTime([]);
                goNext();
              }}
              className={anyChipClass}
            >
              {t("games.finder.any")}
            </button>
          </div>
        </div>
      );

    if (step === 2)
      return (
        <div>
          {stepHeader(t("games.finder.difficulty"), true)}
          <div className="flex flex-wrap gap-1.5">
            {DIFF_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => toggleDiff(o.value)}
                className={chipClass(difficulty.includes(o.value))}
              >
                {t(o.key)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setDifficulty([]);
                goNext();
              }}
              className={anyChipClass}
            >
              {t("games.finder.any")}
            </button>
          </div>
        </div>
      );

    return (
      <div>
        {stepHeader(t("games.finder.type"), true)}
        <div className="flex flex-wrap gap-1.5">
          {SUBDOMAIN_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => toggleSub(o.id)}
              className={chipClass(subs.includes(o.id))}
            >
              {t(o.labelKey)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setSubs([]);
              goNext();
            }}
            className={anyChipClass}
          >
            {t("games.finder.any")}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#F7F3ED] w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Başlık + ilerleme */}
        <div className="px-5 py-4 border-b border-black/10">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-dv-black-deep text-lg">
              {t("games.finder.title")}
            </h2>
            <div className="flex items-center gap-3">
              {!done && (
                <span className="font-body text-dv-gray-600 text-xs">
                  {t("games.finder.stepLabel", {
                    current: step + 1,
                    total: TOTAL_STEPS,
                  })}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="text-dv-gray-600 hover:text-dv-black text-2xl leading-none"
              >
                ×
              </button>
            </div>
          </div>
          <div className="flex gap-1.5 mt-3">
            {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  done || idx <= step ? "bg-dv-red" : "bg-black/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* İçerik */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5">
          {!done ? (
            renderStep()
          ) : (
            <div>
              {results.length === 0 ? (
                <p className="font-body text-dv-gray-700 text-sm text-center py-6">
                  {t("games.finder.empty")}
                </p>
              ) : (
                <>
                  <p className="font-display font-semibold text-dv-black-deep text-base mb-1">
                    {t("games.finder.resultsTitle")}
                  </p>
                  {summaryParts.length > 0 && (
                    <p className="font-body text-dv-gray-600 text-xs mb-3">
                      {summaryParts.join(" · ")}
                    </p>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {visible.map((r) => (
                      <GameCard
                        key={r.game._id}
                        game={r.game}
                        flipped={flippedId === r.game._id}
                        onToggle={() =>
                          setFlippedId(flippedId === r.game._id ? null : r.game._id)
                        }
                        reasonLabel={reasonLabel(r.reason)}
                      />
                    ))}
                  </div>
                  {!showAll && results.length > PREVIEW_COUNT && (
                    <button
                      type="button"
                      onClick={() => setShowAll(true)}
                      className="mt-3 w-full text-center font-body text-sm text-dv-red font-semibold hover:underline"
                    >
                      {t("games.finder.showAll", { count: results.length })}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Alt eylem çubuğu */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-black/10 bg-white/50">
          <button
            type="button"
            onClick={goBack}
            className={`font-body text-sm text-dv-gray-700 hover:text-dv-black px-3 py-2 ${
              !done && step === 0 ? "invisible" : ""
            }`}
          >
            {t("games.finder.back")}
          </button>

          {done ? (
            <button
              type="button"
              onClick={reset}
              className="rounded-full px-5 py-2.5 font-body font-semibold text-white bg-dv-red hover:bg-dv-red-light transition-colors"
            >
              {t("games.finder.restart")}
            </button>
          ) : step === TYPE_STEP ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-full px-6 py-2.5 font-body font-semibold text-white bg-dv-red hover:bg-dv-red-light transition-colors"
            >
              {t("games.finder.submit")}
            </button>
          ) : step === 0 ? (
            <button
              type="button"
              onClick={goNext}
              className="font-body text-sm text-dv-gray-700 hover:text-dv-black px-3 py-2"
            >
              {t("games.finder.skip")}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="rounded-full px-6 py-2.5 font-body font-semibold text-white bg-dv-red hover:bg-dv-red-light transition-colors"
            >
              {t("games.finder.next")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
