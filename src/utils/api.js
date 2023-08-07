import axios from "axios";
export const apiUrl = "http://localhost:8082/api/"
export const api = axios.create({baseURL: apiUrl})
export const endpoints = {
    products: "product/",
    Login: "user/signin",
}