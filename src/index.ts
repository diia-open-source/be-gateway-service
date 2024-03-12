import { initTracing } from '@diia-inhouse/diia-app'

const serviceName = 'Gateway'

initTracing(serviceName)

import 'module-alias/register'
import { bootstrap } from './bootstrap'

bootstrap(serviceName)
