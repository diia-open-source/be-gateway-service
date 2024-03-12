import FaqCmsDataMapper from '@dataMappers/cms/faqCmsDataMapper'

import { FaqParameterType } from '@interfaces/models/faqCategory'

describe(`Mapper ${FaqCmsDataMapper.name}`, () => {
    let faqCmsDataMapper: FaqCmsDataMapper

    beforeEach(() => {
        faqCmsDataMapper = new FaqCmsDataMapper()
    })

    it('should map CmsFaq to FaqItem correctly', () => {
        const cmsFaq = {
            question: 'What is FAQ?',
            answer: 'Frequently Asked Questions',
            subFeatures: [],
            parameters: [
                {
                    type: FaqParameterType.Link,
                    data: {
                        name: 'FAQ Link',
                        alt: 'FAQ Alternative',
                        resource: 'https://example.com/faq',
                    },
                },
                {
                    type: FaqParameterType.Email,
                    data: {
                        name: 'Contact Email',
                        alt: 'Email Alternative',
                        resource: 'contact@example.com',
                    },
                },
            ],
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
            publishedAt: '2023-07-01T15:00:00Z',
        }

        const expectedFaqItem = {
            question: 'What is FAQ?',
            answer: 'Frequently Asked Questions',
            subFeatures: [],
            parameters: [
                {
                    type: FaqParameterType.Link,
                    data: {
                        name: 'FAQ Link',
                        alt: 'FAQ Alternative',
                        resource: 'https://example.com/faq',
                    },
                },
                {
                    type: FaqParameterType.Email,
                    data: {
                        name: 'Contact Email',
                        alt: 'Email Alternative',
                        resource: 'contact@example.com',
                    },
                },
            ],
        }

        const result = faqCmsDataMapper.toEntity(cmsFaq)

        expect(result).toEqual(expectedFaqItem)
    })

    it('should handle empty parameters array in CmsFaq', () => {
        const cmsFaq = {
            question: 'What is FAQ?',
            answer: 'Frequently Asked Questions',
            subFeatures: [],
            parameters: [],
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
        }

        const expectedFaqItem = {
            question: 'What is FAQ?',
            answer: 'Frequently Asked Questions',
            subFeatures: [],
            parameters: [],
        }

        const result = faqCmsDataMapper.toEntity(cmsFaq)

        expect(result).toEqual(expectedFaqItem)
    })

    it('should not modify the original CmsFaq object', () => {
        const cmsFaq = {
            question: 'What is FAQ?',
            answer: 'Frequently Asked Questions',
            subFeatures: [],
            parameters: [
                {
                    type: FaqParameterType.Link,
                    data: {
                        name: 'FAQ Link',
                        alt: 'FAQ Alternative',
                        resource: 'https://example.com/faq',
                    },
                },
            ],
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
        }

        faqCmsDataMapper.toEntity(cmsFaq)

        expect(cmsFaq).toEqual({
            question: 'What is FAQ?',
            answer: 'Frequently Asked Questions',
            subFeatures: [],
            parameters: [
                {
                    type: FaqParameterType.Link,
                    data: {
                        name: 'FAQ Link',
                        alt: 'FAQ Alternative',
                        resource: 'https://example.com/faq',
                    },
                },
            ],
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
        })
    })

    it('should handle missing publishedAt in CmsFaq', () => {
        const cmsFaq = {
            question: 'What is FAQ?',
            answer: 'Frequently Asked Questions',
            subFeatures: [],
            parameters: [
                {
                    type: FaqParameterType.Link,
                    data: {
                        name: 'FAQ Link',
                        alt: 'FAQ Alternative',
                        resource: 'https://example.com/faq',
                    },
                },
            ],
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
        }

        const expectedFaqItem = {
            question: 'What is FAQ?',
            answer: 'Frequently Asked Questions',
            subFeatures: [],
            parameters: [
                {
                    type: FaqParameterType.Link,
                    data: {
                        name: 'FAQ Link',
                        alt: 'FAQ Alternative',
                        resource: 'https://example.com/faq',
                    },
                },
            ],
        }

        const result = faqCmsDataMapper.toEntity(cmsFaq)

        expect(result).toEqual(expectedFaqItem)
    })

    it('should map multiple CmsFaq items to FaqItem array', () => {
        const cmsFaqItems = [
            {
                question: 'Question 1',
                answer: 'Answer 1',
                subFeatures: [],
                parameters: [
                    {
                        type: FaqParameterType.Link,
                        data: {
                            name: 'Link 1',
                            alt: 'Alt 1',
                            resource: 'https://example.com/link1',
                        },
                    },
                ],
                createdAt: '2023-07-01T12:00:00Z',
                updatedAt: '2023-07-01T14:30:00Z',
                publishedAt: '2023-07-01T15:00:00Z',
            },
            {
                question: 'Question 2',
                answer: 'Answer 2',
                subFeatures: [],
                parameters: [
                    {
                        type: FaqParameterType.Phone,
                        data: {
                            name: 'Phone 2',
                            alt: 'Alt 2',
                            resource: '+1234567890',
                        },
                    },
                ],
                createdAt: '2023-07-02T12:00:00Z',
                updatedAt: '2023-07-02T14:30:00Z',
                publishedAt: '2023-07-02T15:00:00Z',
            },
        ]

        const expectedFaqItems = [
            {
                question: 'Question 1',
                answer: 'Answer 1',
                subFeatures: [],
                parameters: [
                    {
                        type: FaqParameterType.Link,
                        data: {
                            name: 'Link 1',
                            alt: 'Alt 1',
                            resource: 'https://example.com/link1',
                        },
                    },
                ],
            },
            {
                question: 'Question 2',
                answer: 'Answer 2',
                subFeatures: [],
                parameters: [
                    {
                        type: FaqParameterType.Phone,
                        data: {
                            name: 'Phone 2',
                            alt: 'Alt 2',
                            resource: '+1234567890',
                        },
                    },
                ],
            },
        ]

        const result = cmsFaqItems.map(faqCmsDataMapper.toEntity)

        expect(result).toEqual(expectedFaqItems)
    })
})
