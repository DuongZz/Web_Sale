import axios from "axios"
import QueryString from "qs"
import { env } from "~/config/environment"

export const getGoogleOauthToken = async (code) => {
  const url = 'https://oauth2.googleapis.com/token'

  const values = {
    code,
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_SECRET,
    redirect_uri: env.GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code'
  }
  try {
    const res = await axios.post(url, QueryString.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return res.data;
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function getGoogleUser(
  id_token,
  access_token,
){
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}