import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Department,
  EmployeeStats,
  Group,
  Source,
  Status,
  Ticket,
  TicketReason,
  TicketType,
} from "./CRMSettingsTypes";
import SiteManager from "./CRMSettingsManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all Banners
export const useGetAllGroups = (params: ParamsQuery) => {
  console.log(params, "ggggs");

  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Group[];
    };
  }>({
    queryKey: ["Group", params],
    queryFn: () => SiteManager.getAllGroups(params),
    enabled: true,
    retry: false,
  });
};
export const useGetGroup = (id?: string) => {
  return useQuery<{
    data: Group;
  }>({
    queryKey: ["Group", id],
    queryFn: () => SiteManager.getGroup(id),
    enabled: !!id,
    retry: false,
  });
};
export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Group"] });
    },
    retry: false,
  });
};
export const useAddGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Group) => SiteManager.addGroup(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Group"] });
    },
    retry: false,
  });
};
export const useGetAllDepartments = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Department[];
    };
  }>({
    queryKey: ["Department", params],
    queryFn: () => SiteManager.getAllDepartments(params),
    enabled: true,
    retry: false,
  });
};

export const useGetDepartment = (id?: string) => {
  return useQuery<{
    data: Department;
  }>({
    queryKey: ["Department", id],
    queryFn: () => SiteManager.getDepartment(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Department"] });
    },
    retry: false,
  });
};

export const useAddDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Department) => SiteManager.addDepartment(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Department"] });
    },
    retry: false,
  });
};
export const useGetAllSources = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Source[];
    };
  }>({
    queryKey: ["Source", params],
    queryFn: () => SiteManager.getAllSources(params),
    enabled: true,
    retry: false,
  });
};

export const useGetSource = (id?: string) => {
  return useQuery<{
    data: Source;
  }>({
    queryKey: ["Source", id],
    queryFn: () => SiteManager.getSource(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteSource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteSource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Source"] });
    },
    retry: false,
  });
};

export const useAddSource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Source) => SiteManager.addSource(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Source"] });
    },
    retry: false,
  });
};
export const useGetAllStatuses = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Status[];
    };
  }>({
    queryKey: ["Status", params],
    queryFn: () => SiteManager.getAllStatuses(params),
    enabled: true,
    retry: false,
  });
};

export const useGetStatus = (id?: string) => {
  return useQuery<{
    data: Status;
  }>({
    queryKey: ["Status", id],
    queryFn: () => SiteManager.getStatus(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Status"] });
    },
    retry: false,
  });
};

export const useAddStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Status) => SiteManager.addStatus(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Status"] });
    },
    retry: false,
  });
};
export const useGetAllTicketTypes = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: TicketType[];
    };
  }>({
    queryKey: ["CrmTicketType", params],
    queryFn: () => SiteManager.getAllTicketTypes(params),
    enabled: true,
    retry: false,
  });
};

export const useGetTicketType = (id?: string) => {
  return useQuery<{
    data: TicketType;
  }>({
    queryKey: ["CrmTicketType", id],
    queryFn: () => SiteManager.getTicketType(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteTicketType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteTicketType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CrmTicketType"] });
    },
    retry: false,
  });
};

export const useAddTicketType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TicketType) => SiteManager.addTicketType(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CrmTicketType"] });
    },
    retry: false,
  });
};
export const useGetAllTickets = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Ticket[];
    };
  }>({
    queryKey: ["CrmTicket", params],
    queryFn: () => SiteManager.getAllTickets(params),
    enabled: true,
    retry: false,
  });
};
export const useGetAllEmployeesPoints = (params: ParamsQuery) => {
  return useQuery<EmployeeStats[]>({
    queryKey: ["EmployeesPoints", params],
    queryFn: () => SiteManager.getAllEmployeesPoints(params),
    enabled: true,
    retry: false,
  });
};
export const useGetAllEmployees = (params: ParamsQuery) => {
  return useQuery<{ empName: string; empId: number }[]>({
    queryKey: ["Employees", params],
    queryFn: () => SiteManager.getAllEmployees(params),
    enabled: true,
    retry: false,
  });
};

export const useGetTicket = (id?: string) => {
  return useQuery<{
    data: Ticket;
  }>({
    queryKey: ["CrmTicket", id],
    queryFn: () => SiteManager.getTicket(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CrmTicket"] });
    },
    retry: false,
  });
};

export const useAddTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Ticket) => SiteManager.addTicket(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CrmTicket"] });
    },
    retry: false,
  });
};

// React Query hooks
export const useGetAllTicketReasons = (params: ParamsQuery) => {
  return useQuery<{
    data: TicketReason[];
  }>({
    queryKey: ["TicketReason", params],
    queryFn: () => SiteManager.getAllTicketReasons(params),
    enabled: true,
    retry: false,
  });
};

export const useGetTicketReason = (id?: string) => {
  return useQuery<{
    data: TicketReason;
  }>({
    queryKey: ["TicketReason", id],
    queryFn: () => SiteManager.getTicketReason(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteTicketReason = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => SiteManager.deleteTicketReason(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TicketReason"] });
    },
    retry: false,
  });
};

export const useAddTicketReason = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TicketReason) => SiteManager.addTicketReason(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TicketReason"] });
    },
    retry: false,
  });
};
