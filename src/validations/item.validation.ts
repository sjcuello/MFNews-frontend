import * as yup from 'yup';

export const articleValidationSchema = (excludedNames: string[]) =>
  yup.object({
    title: yup
      .string()
      .required('Title is required')
      .notOneOf(excludedNames, ({ value }) => `${value} is not allowed`),
    subtitle: yup
      .string()
      .required('SubTitle is required'),
    description: yup
      .string()
      .required('Title is required')
      .max(100, 'Description is too long. Max 100 characters'),
    imageUrl: yup
      .string()
      .url('Image URL must be a valid URL')
      .required('Image URL is required'),
    author: yup
      .string()
      .required('Author is required'),
    category: yup
      .string()
      .required('Category is required'),
    content: yup
      .string()
      .required('Content is required')
      .max(30, 'Content is too long. Max 30 characters'),
  });
