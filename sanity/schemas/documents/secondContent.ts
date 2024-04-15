import { defineField, defineType } from "sanity";

export default defineType({
  name: 'secondContent',
  title: 'Second Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraph',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraph2',
      title: 'Sub Paragraph',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
});