import { SessionType } from '@diia-inhouse/types'

import { FaqCategory } from '@interfaces/models/faqCategory'

type FaqCategoryReq = Omit<FaqCategory, 'sessionType'>
type FaqCategoryRes = Omit<FaqCategory, 'sessionType' | 'features' | 'order'>

export interface Faq {
    session: SessionType
    categories: FaqCategoryReq[]
}

export interface FaqResponse {
    categories: FaqCategoryRes[]
    expirationDate: string
}
