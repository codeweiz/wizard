/**
 * 添加 cookie
 * @param cookieKey 键
 * @param cookieValue 值
 * @param overSeconds 过期时间
 */
export const addCookie = (cookieKey: any, cookieValue: string, overSeconds?: number) => {
    document.cookie = `${cookieKey}=${cookieValue};max-age=${overSeconds}`;
}

/**
 * 删除 cookie
 * @param cookieKey 键
 */
export const deleteCookie = (cookieKey: any) => {
    addCookie(cookieKey, '', -1);
}

/**
 * 获取 cookie
 * @param name cookie 名称
 */
export const getCookie = (name: string) => {
    const cookies = document.cookie;
    const list = cookies.split('; '); // 解析出名/值对列表
    for (let i = 0; i < list.length; i++) {
        const arr = list[i].split('='); // 解析出名和值
        if (arr[0] == name) {
            return decodeURIComponent(arr[1]);
        } // 对cookie值解码
    }
    return '';
}

/**
 * 检验是否存在该 cookie
 * @param cookieKey 键
 */
export const isCookieKey = (cookieKey: string) => {
    const arr = document.cookie.split(';');
    for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split('=');
        if (arr2[0].trim() == cookieKey) {
            return true;
        }
    }
    return false;
}

