import React from "react"
import { Box } from "native-base"
import { ReviewCard } from "./ReviewCard"

interface ReviewListProps { }

export function ReviewList(props: ReviewListProps) {
  return (
    <Box>
      <ReviewCard liked />
      <ReviewCard
        rate={2}
        duration="2 weeks ago"
        username="Jonathan Williams"
        comment="Extraordinary! i just finished it and it really helped Thanks a lot! 🙌 🙌"
      />
      <ReviewCard
        liked
        rate={3}
        duration="3 weeks ago"
        username="Marielle Wigington"
        comment="Awesome! this is what i was looking for, i recommend to everyone 😄😄😄"
      />
      <ReviewCard
        liked
        rate={5}
        duration="3 weeks ago"
        username="Marielle Wigington"
        comment="Awesome! this is what i was looking for, i recommend to everyone 😄😄😄"
      />
    </Box>
  )
}
