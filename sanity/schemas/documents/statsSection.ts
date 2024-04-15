import { defineField, defineType } from "sanity";

export default defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'symbol',
              title: 'Symbol',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
                name: 'name',
                title: 'Name',
                type: 'string',
                validation: (rule) => rule.required(),
              }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(4).max(4),
    }),
  ],
});