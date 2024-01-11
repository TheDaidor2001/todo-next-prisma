// 'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next";



export const getCookieCart = (): {[id:string]:number} => {

    if(hasCookie('cart')) {
        const cockieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cockieCart;
    }

    return {};
}


export const addProductToCart = (productId: string, quantity: number = 1) => {
    const cookieCart = getCookieCart();

    if(cookieCart[productId]) {
        cookieCart[productId] += quantity;
    }else {
        cookieCart[productId] = 1;
    }

    setCookie('cart', JSON.stringify(cookieCart),)
}


export const removeProductFromCart = (productId: string) => {
    const cookieCart = getCookieCart();

    if(cookieCart[productId]) {
        delete cookieCart[productId];
    }

    setCookie('cart', JSON.stringify(cookieCart),)
}

export const removeSingleItemFromCart = (productId: string) => {

    const cookie = getCookieCart()

    if(cookie[productId]) {
        cookie[productId] -= 1;
    }

    if(cookie[productId] <= 0) {
        delete cookie[productId]
    }

    setCookie('cart', JSON.stringify(cookie))

}




