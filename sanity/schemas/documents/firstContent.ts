import { defineField, defineType } from "sanity";

export default defineType({
  name: 'firstContent',
  title: 'First Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
});