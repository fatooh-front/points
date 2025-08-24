import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Banner, Blog, Contact, Offer } from "./SiteTypes";
import SiteManager from "./SiteManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all Banners
export const useGetAllBanners = (params: ParamsQuery) => {
  console.log(params, "ggggs");

  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Banner[];
    };
  }>({
    queryKey: ["Banners", params],
    queryFn: () => SiteManager.getAllBanners(params),
    enabled: true,
    retry: false,
  });
};
export const useGetBanner = (id?: string) => {
  return useQuery<{
    data: Banner;
  }>({
    queryKey: ["Banners", id],
    queryFn: () => SiteManager.getBanner(id),
    enabled: !!id,
    retry: false,
  });
};
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Banners"] });
    },
    retry: false,
  });
};
export const useAddBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Banner) => SiteManager.addBanner(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Banners"] });
    },
    retry: false,
  });
};
export const useGetAllOffers = (params: ParamsQuery) => {
  console.log(params, "ggggs");

  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Offer[];
    };
  }>({
    queryKey: ["Offer", params],
    queryFn: () => SiteManager.getAllOffers(params),
    enabled: true,
    retry: false,
  });
};
export const useGetOffer = (id?: string) => {
  return useQuery<{
    data: Offer;
  }>({
    queryKey: ["Offer", id],
    queryFn: () => SiteManager.getOffer(id),
    enabled: !!id,
    retry: false,
  });
};
export const useDeleteOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Offer"] });
    },
    retry: false,
  });
};
export const useAddOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Offer) => SiteManager.addOffer(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Offer"] });
    },
    retry: false,
  });
};
// Get all blogs
export const useGetAllBlogs = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Blog[];
    };
  }>({
    queryKey: ["Blog", params],
    queryFn: () => SiteManager.getAllBlogs(params),
    enabled: true,
    retry: false,
  });
};

// Get single blog
export const useGetBlog = (id?: string) => {
  return useQuery<{
    data: Blog;
  }>({
    queryKey: ["Blog", id],
    queryFn: () => SiteManager.getBlog(id),
    enabled: !!id,
    retry: false,
  });
};

// Delete blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Blog"] });
    },
    retry: false,
  });
};

// Add blog
export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Blog) => SiteManager.addBlog(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Blog"] });
    },
    retry: false,
  });
};
export const useGetAllContacts = (params: ParamsQuery) => {
  return useQuery<{
    data: Contact[];
  }>({
    queryKey: ["Contact", params],
    queryFn: () => SiteManager.getAllContacts(params),
    enabled: true,
    retry: false,
  });
};

// Add
export const useAddContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Contact) => SiteManager.addContact(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Contact"] });
    },
    retry: false,
  });
};
