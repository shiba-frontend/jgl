import { category, common, negative, positive, search } from "./keyword";

export const Actions = {
  SEARCH: "SEARCH_ACTION",
  READ_STORY: "READ_STORY",
  STOP_READ_STORY: "STOP_READ_STORY",
  NOT_FOUND: "NOT_FOUND",
  SEARCH_SINGLE: "SEARCH_SINGLE",
};

const getTopics = (messages) => {
  let result = category.filter((c) => {
    let regex = new RegExp(`(${c})`, "g");
    return regex.test(messages);
  });
  console.log("Search Actions: Match: ", result);

  if (result.length === 0) {
    return { status: "NOT_FOUND" };
  }

  return {
    status: "FOUND",
    topic: result[0],
  };
};

const getArticle = (message) => {
  let SearchExpression = new RegExp(`(${search.join("|")})`, "g");
  let PositiveExpression = new RegExp(`(${positive.join("|")})`, "g");
  let NegativeExpression = new RegExp(`(${negative.join("|")})`, "g");
  let CommonExpression = new RegExp(`(${common.join("|")})`, "g");
  let PunctuationExpress = /[.,\/#!$%\^&\*;:{}=\-_`~()?]/g;

  return message
    .replaceAll(SearchExpression, "")
    .trim()
    .replaceAll(CommonExpression, "")
    .trim()
    .replaceAll(PunctuationExpress, "")
    .trim();
};

export const getAction = (message) => {
  let SearchExpression = new RegExp(`(${search.join("|")})`, "g");
  let PositiveExpression = new RegExp(`(${positive.join("|")})`, "g");
  let NegativeExpression = new RegExp(`(${negative.join("|")})`, "g");

  if (SearchExpression.test(message)) {
    if (getTopics(message).topic) {
      return {
        action: Actions.SEARCH,
        topic: getTopics(message),
      };
    }
    return {
      action: Actions.SEARCH_SINGLE,
      topic: getArticle(message),
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
