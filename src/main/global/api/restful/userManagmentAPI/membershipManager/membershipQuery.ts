import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Membership } from "./membershipTypes";
import MembershipsManager from "./membershipManager";

// Fetch all memberships
export const useGetAllMemberships = () => {
  return useQuery<{ data: { content: Membership[] } }>({
    queryKey: ["Memberships"],
    queryFn: MembershipsManager.getAllMemberships,
    enabled: true,
    retry: false,
  });
};

// Fetch a single membership by ID
export const useGetMembershipById = (id?: string) => {
  return useQuery<{ data: Membership }>({
    queryKey: ["Memberships", id],
    queryFn: () => MembershipsManager.getMembership(id!),
    enabled: !!id,
    retry: false,
  });
};
export const useDeleteMemberships = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      MembershipsManager.deleteMembership(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Memberships"] });
    },
    retry: false,
  });
};
// Add a new membership
export const useAddMembership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Membership) => MembershipsManager.addMembership(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Memberships"] });
    },
    retry: false,
  });
};
