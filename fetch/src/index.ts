export type SerializableRequestInit = Omit<RequestInit, 'body' | 'signal'> & {
  body?: string
}

export interface RequestInfo {
  input: string
  init?: SerializableRequestInit
}

export type DoRequest = (() => Promise<Response>) & { [SER in typeof SER]: RequestInfo }

export interface FetchBullet {
  loaded: (doRequest: DoRequest) => void
  requests: RequestInfo[]
}

export const SER = 'Serialize'

export function createBullet(): FetchBullet {
  const requests: RequestInfo[] = []
  return {
    loaded: (doRequest: DoRequest) => {
      requests.push(doRequest[SER])
    },
    requests,
  }
}

export function createFetch(
  input: string,
  init?: Omit<RequestInit, 'body' | 'signal'> & {
    body?: string
  },
): DoRequest {
  // @ts-expect-error
  const doRequest: DoRequest = () => fetch(input, init)
  doRequest[SER] = { input, init }
  return doRequest
}
