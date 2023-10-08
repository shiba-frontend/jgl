import { category, common, negative, positive, search } from "./keyword";

export const Actions = {
  SEARCH: "SEARCH_ACTION",
  READ_STORY: "READ_STORY",
  STOP_READ_STORY: "STOP_READ_STORY",
  NOT_FOUND: "NOT_FOUND",
};

const getTopics = (messages) => {
  let result = category.filter((c) => {
    let regex = new RegExp(`(${c})`, "g");
    return regex.test(messages);
  });
  console.log("Search Actions: Match: ", result);
  // category.forEach((c) => {
  //   let regex = new RegExp(`(${c})`, "g");
  //   console.log("Search Actions: RegEx: ", regex);
  //   console.log("Search Actions: Match: ", regex.test(messages));
  //   if (regex.test(messages)) {
  //     return {
  //       status: "FOUND",
  //       topic: c,
  //     };
  //   }
  // });
  if (result.length === 0) {
    return { status: "NOT_FOUND" };
  }

  return {
    status: "FOUND",
    topic: result[0],
  };
};

export const getAction = (message) => {
  let SearchExpression = new RegExp(`(${search.join("|")})`, "g");
  let PositiveExpression = new RegExp(`(${positive.join("|")})`, "g");
  let NegativeExpression = new RegExp(`(${negative.join("|")})`, "g");

  if (SearchExpression.test(message)) {
    return {
      action: Actions.SEARCH,
      topic: getTopics(message),
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
