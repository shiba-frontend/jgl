import { negative, positive, search } from "./keyword";

export const Actions = {
  SEARCH: "SEARCH_ACTION",
  READ_STORY: "READ_STORY",
  STOP_READ_STORY: "STOP_READ_STORY",
  NOT_FOUND: "NOT_FOUND",
};

export const getAction = (message) => {
  let SearchExpression = new RegExp(`(${search.join("|")})`, "g");
  let PositiveExpression = new RegExp(`(${positive.join("|")})`, "g");
  let NegativeExpression = new RegExp(`(${negative.join("|")})`, "g");

  if (SearchExpression.test(message)) {
    return {
      action: Actions.SEARCH,
    };
  }

  if (PositiveExpression.test(message)) {
    return {
      action: Actions.READ_STORY,
    };
  }
  if (NegativeExpression.test(message)) {
    return {
      action: Actions.STOP_READ_STORY,
    };
  }

  return {
    action: Actions.NOT_FOUND,
  };
};
