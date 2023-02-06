declare interface OAuthUser{
  iss: string;
  nbf: number;
  aud: string;
  sub: string; // google id
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

type OAuthUserString = string

declare interface Storage {
  getItem(key: 'user'): OAuthUserString;
}

declare interface JSON {
  parse(user: OAuthUserString): OAuthUser;
} 