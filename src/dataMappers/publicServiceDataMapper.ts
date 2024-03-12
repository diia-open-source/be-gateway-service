import { PublicService, PublicServiceResponse } from '@interfaces/services/publicServicesList'

export default class BankDataMapper {
    toEntity(publicService: PublicService): PublicServiceResponse {
        const { sortOrder, ...response } = publicService

        return response
    }
}
