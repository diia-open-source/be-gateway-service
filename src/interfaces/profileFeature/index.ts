/* eslint-disable @typescript-eslint/no-use-before-define */

import { ProfileFeature } from '@diia-inhouse/types'

type ProfileFeatureChecker = (feature: ProfileFeature) => boolean

export abstract class ProfileFeatureExpression {
    protected constructor(readonly features: ProfileFeature[]) {}

    abstract match(checker: ProfileFeatureChecker): boolean

    static only(feature: ProfileFeature): ProfileFeatureExpression {
        return new ProfileFeatureOnly(feature)
    }

    static oneOf(features: ProfileFeature[]): ProfileFeatureExpression {
        return new ProfileFeatureOneOf(features)
    }

    static allOf(features: ProfileFeature[]): ProfileFeatureExpression {
        return new ProfileFeatureAll(features)
    }

    static mayHave(features: ProfileFeature[]): ProfileFeatureExpression {
        return new ProfileFeatureMayHave(features)
    }
}

class ProfileFeatureOnly extends ProfileFeatureExpression {
    constructor(feature: ProfileFeature) {
        super([feature])
    }

    match(checker: ProfileFeatureChecker): boolean {
        return checker(this.features[0])
    }
}

class ProfileFeatureOneOf extends ProfileFeatureExpression {
    match(checker: ProfileFeatureChecker): boolean {
        for (const feature of this.features) {
            if (checker(feature)) {
                return true
            }
        }

        return false
    }
}

class ProfileFeatureAll extends ProfileFeatureExpression {
    match(checker: ProfileFeatureChecker): boolean {
        for (const feature of this.features) {
            if (!checker(feature)) {
                return false
            }
        }

        return true
    }
}

class ProfileFeatureMayHave extends ProfileFeatureExpression {
    match(checker: ProfileFeatureChecker): boolean {
        for (const feature of this.features) {
            checker(feature)
        }

        return true
    }
}
