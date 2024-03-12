import { DiiaOfficeProfileData, ProfileFeature } from '@diia-inhouse/types'

export interface UserProfileFeatures {
    [ProfileFeature.office]?: DiiaOfficeProfileData
}
