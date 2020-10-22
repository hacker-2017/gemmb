import fly from './index'

import { encryption } from '@/utils/index'


export const login = (username, password) => {

	const body = {
		Identity: username, 
		HashedPassword: encryption(password)
	}

	return fly.post("/Api/Security/AccessTokens", body);

}


