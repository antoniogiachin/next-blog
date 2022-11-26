import { useState, useEffect, useMemo } from "react";
import { useApi } from "./useApi";
import dayjs from "dayjs";

export const useReactionSaveAndLimit = (review, reviewFetcher) => {
  const [upCounter, setUpCounter] = useState(0);
  const [downCounter, setDownCounter] = useState(0);
  const [heCounter, setHeCounter] = useState(0);
  const [isReactionLoading, setIsReactionLoading] = useState("");

  const { putApi } = useApi();

  const savedLimiter = localStorage.getItem("reactionLimiter");

  const whichIsLoading = useMemo(() => {
    if (isReactionLoading === "thumbUp") {
      return "thumbUp";
    } else if (isReactionLoading === "thumbsDown") {
      return "thumbsDown";
    } else if (isReactionLoading === "heart") {
      return "heart";
    }
  }, [isReactionLoading]);

  useEffect(() => {
    if (savedLimiter) {
      const parsed = JSON.parse(savedLimiter);
      const actualReview = parsed.find((r) => r._id === review._id);
      if (actualReview) {
        const { reactions } = actualReview;
        if (
          (reactions.thumbUp.date && dayjs() < reactions.thumbUp.date) ||
          reactions.thumbUp.isSubmitted
        ) {
          setUpCounter(1);
        } else if (
          (reactions.thumbsDown.date && dayjs() < reactions.thumbsDown.date) ||
          reactions.thumbsDown.isSubmitted
        ) {
          setDownCounter(1);
        } else if (
          (reactions.heart.date && dayjs() < reactions.heart.date) ||
          reactions.heart.isSubmitted
        ) {
          setHeCounter(1);
        }
      }
    }
  }, [savedLimiter, review]);

  const handleReactionSubmit = async (reaction) => {
    if (isReactionLoading.length) {
      return;
    }

    /*
      limiter proto
      reactionLimited = [
        {id: "...", reactions: {
        thumbUp: { isSubmitted: false, date: dayjs() },
        thumbsDown: { isSubmitted: false, date: dayjs() },
        heart: { isSubmitted: false, date: dayjs() },
        }},
        {id: "...", reactions: {
        thumbUp: { isSubmitted: false, date: dayjs() },
        thumbsDown: { isSubmitted: false, date: dayjs() },
        heart: { isSubmitted: false, date: dayjs() },
        }},
        {id: "...", reactions: {
        thumbUp: { isSubmitted: false, date: dayjs() },
        thumbsDown: { isSubmitted: false, date: dayjs() },
        heart: { isSubmitted: false, date: dayjs() },
        }},
       
      ]
  
    */

    const isLimited = localStorage.getItem("reactionLimiter");

    let toBeStored;
    let reviewIndex;

    if (!isLimited) {
      toBeStored = [
        {
          _id: review._id,
          reactions: {
            thumbUp: { isSubmitted: false, date: null },
            thumbsDown: { isSubmitted: false, date: null },
            heart: { isSubmitted: false, date: null },
          },
        },
      ];
      reviewIndex = toBeStored.findIndex((r) => r._id === review._id);
    } else {
      toBeStored = [...JSON.parse(localStorage.getItem("reactionLimiter"))];
      reviewIndex = toBeStored.findIndex((r) => r._id === review._id);
      console.log(toBeStored, reviewIndex);
      if (!reviewIndex || reviewIndex === -1) {
        toBeStored = [
          {
            _id: review._id,
            reactions: {
              thumbUp: { isSubmitted: false, date: null },
              thumbsDown: { isSubmitted: false, date: null },
              heart: { isSubmitted: false, date: null },
            },
          },
        ];
        reviewIndex = toBeStored.findIndex((r) => r._id === review._id);
      }
    }

    // const { thumbUp, thumbsDown, heart } = review.reactions;
    const { reactions } = review;
    const { reactions: toBeStoredReactions } = toBeStored[reviewIndex];

    let canReact = false;
    switch (reaction) {
      case "thumbUp":
        if (
          toBeStoredReactions.thumbUp.date &&
          dayjs() < toBeStoredReactions.thumbUp.date
        ) {
          setIsReactionLoading("");
          return;
        }
        if (!toBeStoredReactions.thumbUp.isSubmitted) {
          setIsReactionLoading("thumbUp");
          reactions["thumbUp"] += 1;
          toBeStoredReactions["thumbUp"].isSubmitted = true;
          toBeStoredReactions["thumbUp"].date = dayjs().add(1, "days");
          setUpCounter((prev) => prev + 1);
          canReact = true;
        }
        break;
      case "thumbsDown":
        if (
          toBeStoredReactions.thumbsDown.date &&
          dayjs() < toBeStoredReactions.thumbsDown.date
        ) {
          setIsReactionLoading("");
          return;
        }
        if (!toBeStoredReactions.thumbsDown.isSubmitted) {
          setIsReactionLoading("thumbsDown");
          reactions["thumbsDown"] += 1;
          toBeStoredReactions["thumbsDown"].isSubmitted = true;
          toBeStoredReactions["thumbsDown"].date = dayjs().add(1, "days");
          setDownCounter((prev) => prev + 1);
          canReact = true;
        }
        break;
      case "heart":
        if (
          toBeStoredReactions.heart.date &&
          dayjs() < toBeStoredReactions.heart.date
        ) {
          setIsReactionLoading("");
          return;
        }
        if (!toBeStoredReactions.heart.isSubmitted) {
          setIsReactionLoading("heart");
          reactions["heart"] += 1;
          toBeStoredReactions["heart"].isSubmitted = true;
          toBeStoredReactions["heart"].date = dayjs().add(1, "days");
          setHeCounter((prev) => prev + 1);
          canReact = true;
        }
        break;
    }

    if (!canReact) {
      return;
    }

    await putApi("/api/reviews/update", reactions, review._id);

    let splicedAndReplaced = [...JSON.parse(isLimited)].splice(
      reviewIndex,
      1,
      toBeStored[reviewIndex]
    );

    // let stringed = [];
    // let stored = [];

    // if (isLimited) {
    //   stringed = JSON.parse(isLimited);

    //   for (const el of stringed) {
    //     if (el && !toBeStored.find((it) => it._id === el._id)) {
    //       stored.push(el);
    //     }
    //   }
    // }
    // const merged = [...stored, ...toBeStored];
    console.log(splicedAndReplaced, "TO BE STORED", toBeStored[reviewIndex]);
    localStorage.setItem("reactionLimiter", JSON.stringify(splicedAndReplaced));

    await reviewFetcher();
    setIsReactionLoading("");
  };

  return {
    whichIsLoading,
    upCounter,
    downCounter,
    heCounter,
    handleReactionSubmit,
  };
};
