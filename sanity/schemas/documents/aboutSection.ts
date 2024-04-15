import { defineField, defineType } from "sanity";

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitles',
      title: 'Subtitles',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(3).max(3),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (rule) => rule.required().min(3).max(3),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'buttonUrl',
        title: 'Button URL',
        type: 'url',
        validation: (rule) => rule.required(),
    }),
  ],
});