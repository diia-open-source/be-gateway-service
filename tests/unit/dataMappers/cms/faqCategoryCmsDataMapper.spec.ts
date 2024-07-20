import { ProfileFeature, SessionType } from '@diia-inhouse/types'

import FaqCategoryCmsDataMapper from '@dataMappers/cms/faqCategoryCmsDataMapper'
import FaqCmsDataMapper from '@dataMappers/cms/faqCmsDataMapper'

import { FaqParameterType } from '@interfaces/models/faqCategory'

describe(`Mapper ${FaqCategoryCmsDataMapper.name}`, () => {
    let faqCategoryCmsDataMapper: FaqCategoryCmsDataMapper
    let faqCmsDataMapper: FaqCmsDataMapper

    beforeEach(() => {
        faqCmsDataMapper = new FaqCmsDataMapper()

        faqCategoryCmsDataMapper = new FaqCategoryCmsDataMapper(faqCmsDataMapper)
    })

    it('should map CmsFaqCategory to FaqCategory correctly', () => {
        const cmsFaqCategory = {
            code: 'CATEGORY_CODE',
            name: 'Category Name',
            sessionType: SessionType.Acquirer,
            faq: {
                data: [
                    {
                        id: 1,
                        attributes: {
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
                    },
                ],
                meta: {},
            },
            features: [
                {
                    value: ProfileFeature.student,
                },
            ],
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
            publishedAt: '2023-07-01T15:00:00Z',
            order: 1,
        }

        const expectedFaqCategory = {
            code: 'CATEGORY_CODE',
            name: 'Category Name',
            sessionType: SessionType.Acquirer,
            faq: [
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
            ],
            features: [ProfileFeature.student],
            order: 1,
        }

        const result = faqCategoryCmsDataMapper.toEntity(cmsFaqCategory)

        expect(result).toEqual(expectedFaqCategory)
    })

    it('should handle missing features in CmsFaqCategory', () => {
        const cmsFaqCategory = {
            code: 'CATEGORY_CODE',
            name: 'Category Name',
            sessionType: SessionType.Acquirer,
            faq: {
                data: [
                    {
                        id: 1,
                        attributes: {
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
                    },
                ],
                meta: {},
            },
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
            publishedAt: '2023-07-01T15:00:00Z',
            order: 1,
        }

        const expectedFaqCategory = {
            code: 'CATEGORY_CODE',
            name: 'Category Name',
            sessionType: SessionType.Acquirer,
            faq: [
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
            ],
            features: undefined,
            order: 1,
        }

        const result = faqCategoryCmsDataMapper.toEntity(cmsFaqCategory)

        expect(result).toEqual(expectedFaqCategory)
    })

    it('should handle empty faq in CmsFaqCategory', () => {
        const cmsFaqCategory = {
            code: 'CATEGORY_CODE',
            name: 'Category Name',
            sessionType: SessionType.Acquirer,
            faq: {
                data: [],
                meta: {},
            },
            features: [
                {
                    value: ProfileFeature.student,
                },
                {
                    value: ProfileFeature.office,
                },
            ],
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
            publishedAt: '2023-07-01T15:00:00Z',
            order: 1,
        }

        const expectedFaqCategory = {
            code: 'CATEGORY_CODE',
            name: 'Category Name',
            sessionType: SessionType.Acquirer,
            faq: [],
            features: [ProfileFeature.student, ProfileFeature.office],
            order: 1,
        }

        const result = faqCategoryCmsDataMapper.toEntity(cmsFaqCategory)

        expect(result).toEqual(expectedFaqCategory)
    })

    it('should handle undefined features in CmsFaqCategory', () => {
        const cmsFaqCategory = {
            code: 'CATEGORY_CODE',
            name: 'Category Name',
            sessionType: SessionType.Acquirer,
            faq: {
                data: [
                    {
                        id: 1,
                        attributes: {
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
                    },
                ],
                meta: {},
            },
            createdAt: '2023-07-01T12:00:00Z',
            updatedAt: '2023-07-01T14:30:00Z',
            publishedAt: '2023-07-01T15:00:00Z',
            order: 1,
        }

        const expectedFaqCategory = {
            code: 'CATEGORY_CODE',
            name: 'Category Name',
            sessionType: SessionType.Acquirer,
            faq: [
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
            ],
            features: undefined,
            order: 1,
        }

        const result = faqCategoryCmsDataMapper.toEntity(cmsFaqCategory)

        expect(result).toEqual(expectedFaqCategory)
    })
})
