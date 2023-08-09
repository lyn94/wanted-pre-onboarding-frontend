import { clientApi } from './clientApi';

export const auth = async (data, url) => {
  return await clientApi({
    method: "post",
    url: `/auth/${url}`,
    data,
  })
}