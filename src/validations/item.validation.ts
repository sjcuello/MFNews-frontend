import * as yup from 'yup';

export const articleValidationSchema = (excludedNames: string[]) =>
  yup.object({
    title: yup
      .string()
      .required('Title is required')
      .notOneOf(excludedNames, ({ value }) => `${value} is not allowed`),
    subTitle: yup
      .string()
      .required('SubTitle is required')
      .notOneOf(excludedNames, ({ value }) => `${value} is not allowed`),
    description: yup
      .string()
      .max(100, 'Description is too long. Max 100 characters'),
    imageUrl: yup
      .string()
      .url('Image URL must be a valid URL')
      .required('Image URL is required')
      .notOneOf(excludedNames, ({ value }) => `${value} is not allowed`),
    author: yup
      .string()
      .required('Author is required')
      .notOneOf(excludedNames, ({ value }) => `${value} is not allowed`),
    category: yup
      .string()
      .required('Category is required')
      .notOneOf(excludedNames, ({ value }) => `${value} is not allowed`),
    content: yup
      .string()
      .required('Content is required')
      .notOneOf(excludedNames, ({ value }) => `${value} is not allowed`)
      .max(30, 'Content is too long. Max 30 characters'),
  });
