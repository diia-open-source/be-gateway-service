import { CacheService } from '@diia-inhouse/redis'
import { Logger, OnInit } from '@diia-inhouse/types'

import PublicServiceDataMapper from '@dataMappers/publicServiceDataMapper'

import { PublicService, PublicServiceResponse, PublicServiceStatus } from '@interfaces/services/publicServicesList'

export default class PublicServicesListService implements OnInit {
    private readonly cacheKey: string = 'public-service'

    private readonly cacheExpiration: number = -1 // unlimited

    private readonly publicServices: PublicService[] = [
        {
            code: 'penalties',
            name: 'Штрафи за порушення ПДР',
            status: PublicServiceStatus.Active,
            sortOrder: 100,
        },
        {
            code: 'debts',
            name: 'Виконавчі провадження',
            status: PublicServiceStatus.Active,
            sortOrder: 101,
        },
        {
            code: 'taxes',
            name: 'Податки',
            status: PublicServiceStatus.InDevelopment,
            sortOrder: 102,
        },
        {
            code: 'documentRecovery',
            name: 'Поновлення документів',
            status: PublicServiceStatus.InDevelopment,
            sortOrder: 103,
        },
        {
            code: 'individualEntrepreneurRegistration',
            name: 'Реєстрація ФОП',
            status: PublicServiceStatus.InDevelopment,
            sortOrder: 104,
        },
        {
            code: 'residenceRegistrationChange',
            name: 'Зміна реєстрації місця проживання',
            status: PublicServiceStatus.InDevelopment,
            sortOrder: 105,
        },
        {
            code: 'marriageRegistration',
            name: 'Реєстрація шлюбу',
            status: PublicServiceStatus.InDevelopment,
            sortOrder: 106,
        },
    ]

    constructor(
        private readonly publicServiceDataMapper: PublicServiceDataMapper,

        private readonly cache: CacheService,
        private readonly logger: Logger,
    ) {}

    async onInit(): Promise<void> {
        this.logger.info('Start insert public services')

        await Promise.all(
            this.publicServices.map((publicService: PublicService) =>
                this.cache.set(this.prepareCacheKey(publicService.code), JSON.stringify(publicService), this.cacheExpiration),
            ),
        )

        this.logger.info('Public services inserted successfully')
    }

    async getPublicServices(): Promise<PublicServiceResponse[]> {
        const keys: string[] = await this.cache.getKeysByPattern(`${this.cacheKey}.*`)
        if (keys.length === 0) {
            this.logger.error('Failed to find public services keys')

            return []
        }

        const publicServicesJSON = await this.cache.getByKeys(keys)

        if (publicServicesJSON.length === 0) {
            this.logger.error('Failed to find public services by keys')

            return []
        }

        const publicServices: PublicServiceResponse[] = publicServicesJSON
            // eslint-disable-next-line unicorn/prefer-native-coercion-functions
            .filter((item: null | string): item is NonNullable<typeof item> => Boolean(item))
            .map((item: string) => JSON.parse(item))
            .filter((item: PublicService) => [PublicServiceStatus.Active, PublicServiceStatus.InDevelopment].includes(item.status))
            .sort((service: PublicService, nextService: PublicService) => service.sortOrder - nextService.sortOrder)
            .map(this.publicServiceDataMapper.toEntity)

        return publicServices
    }

    private prepareCacheKey(code: string): string {
        return `${this.cacheKey}.${code}`
    }
}
