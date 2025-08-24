import { toQueryString } from "@/main/global/utils/queryUtils";
import axios from "axios";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { Banner, Blog, Contact, Offer } from "./SiteTypes";

class SiteManager {
  static async getAllBanners(params: ParamsQuery) {
    return (await axios.get(`/api/banner/findall?${toQueryString(params)}`))
      .data;
  }

  static async getBanner(id?: string) {
    return (await axios.get(`/api/banner/find/${id}`)).data;
  }
  static async deleteBanner(id: string) {
    return (await axios.delete(`/api/banner/delete/${id}`)).data;
  }
  static async addBanner(body: Banner) {
    return (await axios.post(`/api/banner/save`, body)).data;
  }
  static async getAllOffers(params: ParamsQuery) {
    return (await axios.get(`/api/offer/findall?${toQueryString(params)}`))
      .data;
  }

  static async getOffer(id?: string) {
    return (await axios.get(`/api/offer/find/${id}`)).data;
  }
  static async deleteOffer(id: string) {
    return (await axios.delete(`/api/offer/delete/${id}`)).data;
  }
  static async addOffer(body: Offer) {
    return (await axios.post(`/api/offer/save`, body)).data;
  }
  static async getBlog(id?: string) {
    return (await axios.get(`/api/blog/find/${id}`)).data;
  }

  static async deleteBlog(id: string) {
    return (await axios.delete(`/api/blog/delete/${id}`)).data;
  }

  static async addBlog(body: Blog) {
    return (await axios.post(`/api/blog/save`, body)).data;
  }

  static async getAllBlogs(params: ParamsQuery) {
    return (await axios.get(`/api/blog/findall`, { params })).data;
  }
  static async addContact(body: Contact) {
    return (await axios.post(`/api/contact/save`, body)).data;
  }

  static async getAllContacts(params: ParamsQuery) {
    return (await axios.get(`/api/contact/findall`, { params })).data;
  }
}

export default SiteManager;
