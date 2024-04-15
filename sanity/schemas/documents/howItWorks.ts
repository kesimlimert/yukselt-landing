import { defineField, defineType } from "sanity";

export default defineType({
  name: 'howItWorks',
  title: 'How It Works',
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
    defineField({
        name: 'imageText',
        title: 'Image Text',
        type: 'string',
        validation: (rule) => rule.required(),
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