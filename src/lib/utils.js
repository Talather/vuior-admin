import moment from 'moment';
import { revalidatePath } from 'next/cache';

export function countQuestions(answers) {
  const questions = [];
  for (const answer of answers) {
    if (!questions.includes(answer.question._id)) questions.push(answer.question._id);
  }
  return questions.length;
}

export function fetchUrl(url) {
  return `${window.location.protocol}//${window.location.host}/api${url}`;
}

export function handleError(error, model) {
  console.log(error);
  console.log(error.code, error.message);
  switch (error.code) {
    // non unique value errors
    case 401:
      if (error.message) return { error: error.message };
      break;
    case 11000:
      let key = '';
      let value = '';
      const keyValue = error.keyValue;
      if (keyValue.email) {
        key = 'email';
        value = keyValue.email;
      }
      if (keyValue.name) {
        key = 'name';
        value = keyValue.name;
      }
      return { error: `${model} with ${key} '${value}' already exists. Please provide another ${key}.` };
  }
  return { error: 'An error occurred. Please try again.' };
}

export function handleSuccess({ action, model, path }) {
  if (path) revalidatePath(path);
  return { success: `${model} ${action} successfully.` };
}

function lookup({ from, as, lookupFilters }) {
  const pipeline = [];
  if (lookupFilters?.length) {
    for (const lookupFilter of lookupFilters) {
      pipeline.push(lookup({
        as: lookupFilter.as,
        from: lookupFilter.from,
        lookupFilters: lookupFilter.lookupFilters,
      }));
    }
  }
  return {
    $lookup: {
      as,
      foreignField: '_id',
      from,
      localField: as,
      pipeline,
    },
  };
}

export function lookupFilter(lookupFilters = []) {
  const lookups = [];
  for (const lookupFilter of lookupFilters) {
    lookups.push(lookup({ as: lookupFilter.as, from: lookupFilter.from, lookupFilters: lookupFilter.lookupFilters }));
  }
  return lookups;
}

export function paginationFilter({
  currentPage,
  customFields,
  pageSize,
  simplify = [],
  simplifyFields = [],
  sortBy = [{ sort: 'name', order: 1 }],
  sortOrder,
}) {
  const addFields = {
    $addFields: {},
  };
  if (customFields.length) {
    customFields.forEach(cf => addFields.$addFields[cf.name] = { $toString: cf.value });
  }
  const count = {
    $count: 'totalRecords',
  };
  const limit = {
    $limit: pageSize,
  };
  const match = {
    $match: {},
  };
  const skip = {
    $skip: (currentPage - 1) * pageSize,
  };

  const sortObject = {};
  if (typeof sortBy === 'string') {
    let order;
    switch (sortOrder) {
      case 'asc':
        order = 1;
        break;
      case 'desc':
        order = -1;
        break;
      default:
        order = 1;
    }
    switch (sortBy) {
      case 'topic':
        sortBy = 'topic.name';
        break;
      case 'company':
        sortBy = 'company.name';
        break;
      case 'category':
        sortBy = 'category.name';
        break;
      case 'category.topic':
        sortBy = 'category.topic.name';
        break;
      case 'createdBy':
        sortBy = 'createdBy.firstName';
        break;
      case 'survey':
        sortBy = 'survey.name';
        break;
      case 'employee':
        sortBy = 'employee.firstName';
        break;
      case 'employee.company':
        sortBy = 'employee.company.name';
        break;
    }
    sortObject[sortBy] = order;
  } else {
    for (const i of sortBy) {
      sortObject[i.sort] = i.order;
    }
  }
  const sort = { '$sort': sortObject };


  const toString = {
    $addFields: {
      _id: { $toString: '$_id' },
      //createdAt: { $toString: '$createdAt' },
      //updatedAt: { $toString: '$updatedAt' },
    },
  };

  for (const field of simplify) {
    toString.$addFields[`${field}._id`] = { $toString: `$${field}._id` };
    //toString.$addFields[`${field}.createdAt`] = { $toString: `$${field}.createdAt` };
    //toString.$addFields[`${field}.updatedAt`] = { $toString: `$${field}.updatedAt` };
  }

  for (const field of simplifyFields) {
    toString.$addFields[field] = { $toString: `$${field}` };
  }

  return { addFields, count, limit, match, skip, sort, toString };
}

export function removeSpecialCharacters(str, exceptions = []) {

  const lower = str.toLowerCase();
  const upper = str.toUpperCase();

  let res = '';
  for (let i = 0; i < lower.length; ++i) {
    if (lower[i] !== upper[i] || lower[i].trim() === '' || exceptions.includes(lower[i])) {
      res += str[i];
    }
  }
  return res;
}

export function searchFilter(properties, searchKeyword) {
  searchKeyword = removeSpecialCharacters(searchKeyword, ['@', '.', ',']);
  const filters = [];
  for (const property of properties) {
    filters.push({
      [property]: {
        $regex: searchKeyword, $options: 'i',
      },
    });
  }
  return filters;
}

export function simplifyObject(object, simplify = []) {
  object._id = object._id.toString();
  object.createdAt = object.createdAt.toString();
  object.updatedAt = object.updatedAt.toString();

  for (const field of simplify) {
    object[field.name] = simplifyObject(object[field.name], field.simplify);
  }
  return object;
}

export function reportDataSetConstructor(responses, sortByQuestions = false) {
  let topics = [];
  for (const response of responses) {
    let topic = response.answer.question.subcategory.category.topic;

    topic.id = topic._id.toString();
    let topicIndex = topics.findIndex((tIndex) => tIndex.id === topic.id);

    if (topicIndex < 0) {
      topics.push(topic);
      topicIndex = topics.length - 1;
    }

    topic = topics[topicIndex];
    if (!topic.categories) {
      topic.categories = [];
    }
    let category = response.answer.question.subcategory.category;

    category.id = category._id.toString();
    let categoryIndex = topic.categories.findIndex(
      (cIndex) => cIndex.id === category.id,
    );
    if (categoryIndex < 0) {
      topic.categories.push(category);
      categoryIndex = topic.categories.length - 1;
    }

    category = topic.categories[categoryIndex];

    if (!category.subcategories) {
      category.subcategories = [];
    }
    let subcategory = response.answer.question.subcategory;

    subcategory.id = subcategory._id.toString();
    let subcategoryIndex = category.subcategories.findIndex(
      (sIndex) => sIndex.id === subcategory.id,
    );
    if (subcategoryIndex < 0) {
      category.subcategories.push(subcategory);
      subcategoryIndex = category.subcategories.length - 1;
    }

    subcategory = category.subcategories[subcategoryIndex];

    if (sortByQuestions) {
      if (!subcategory.questions) {
        subcategory.questions = [];
      }
      let question = response.answer.question;

      question.id = question._id.toString();
      let questionIndex = subcategory.questions.findIndex((qIndex) => qIndex.id === question.id);
      if (questionIndex < 0) {
        subcategory.questions.push(question);
        questionIndex = subcategory.questions.length - 1;
      }

      question = subcategory.questions[questionIndex];

      if (!question.answers) {
        question.answers = [];
      }
      let answer = response.answer;

      answer.id = answer._id.toString();
      let answerIndex = question.answers.findIndex((aIndex) => aIndex.id === answer.id);
      if (answerIndex < 0) {
        question.answers.push(answer);
      }
      if (question.invert) {
        question.answers.sort((a, b) => b.score - a.score);
      } else {
        question.answers.sort((a, b) => a.score - b.score);
      }
    } else {
      if (!subcategory.responses) {
        subcategory.responses = [];
      }

      subcategory.responses.push(response);
    }
  }
  return topics;
}

export function transformDate(date) {
  moment.locale('de');
  return moment(date).format('D. MMMM YYYY ');
}

export function unwindFilter(unwindFilters = []) {
  const unwinds = [];
  for (const unwindFilter of unwindFilters) {
    unwinds.push({ $unwind: unwindFilter });
  }
  return unwinds;
}




export function decodeJwt(token) {
  // Split the token into its parts (header, payload, and signature)
  const base64Url = token.split(".")[1]

  // Convert base64Url to base64 (needed to decode)
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")

  // Decode the base64 string into a JSON string
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join("")
  )

  // Return the parsed JSON object
  return JSON.parse(jsonPayload)
}

export async function getFreshToken(auth) {
  const user = auth.currentUser

  // Check if user is signed in
  if (user) {
    const idToken = await user.getIdToken(true) // Force refresh of the token
    return idToken
  } else {
    throw new Error("User is not signed in")
  }
}












