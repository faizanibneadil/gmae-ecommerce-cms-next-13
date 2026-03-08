import path from 'path'
import { buildConfig, inMemoryKVAdapter } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { collections } from './collections/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { plugins } from './plugins/config'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    kv: inMemoryKVAdapter(),
    hooks: {
        afterError: [console.log]
    },
    // upload: {
    //     limits: {
    //         fileSize: 2000
    //     }
    // },
    admin: {
        autoLogin: {
            email: 'faizanibneadil1@gmail.com',
            password: 'faizan98',
            prefillOnly: true
        },
        dashboard: {
            widgets: []
        },
        suppressHydrationWarning: true,
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    cors: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
    csrf: [process.env.NEXT_PUBLIC_SERVER_URL!].filter(Boolean),
    collections: [...collections],
    blocks: [],
    globals: [],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET!,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    email: resendAdapter({
        defaultFromAddress: 'faizanibneadil1@gmail.com',
        defaultFromName: 'Skill Shelf',
        apiKey: process.env.RESEND_API_KEY!,
    }),
    // database-adapter-config-start
    db: postgresAdapter({
        blocksAsJSON: true,
        readReplicas: [process.env.NEON_READ_REPLICA_URI_1!, process.env.NEON_READ_REPLICA_URI_2!],
        pool: {
            connectionString: process.env.NEON_URI
        }
    }),
    // database-adapter-config-end
    sharp,
    onInit: async (payload) => {
        payload.logger.info('App is initialized ...')

        const users = await payload.find({
            collection: 'users'
        })
        console.log({ users: users.docs })

    },
    plugins: [...plugins],
})