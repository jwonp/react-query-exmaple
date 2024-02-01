"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const Lists = () => {
  const [items, setItems] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const listQuery = useQuery<string[]>({
    queryKey: ["list"],
    queryFn: () =>
      axios
        .get(`/api/list${items.length > 0 ? `?items=${items.join("$")}` : ""}`)
        .then((res) => res.data),

  });
  const listMutation = useMutation({
    mutationKey: ["list"],
    mutationFn: (newItem: string) =>
      axios.post(`/api/list`, { items: items, newItem: newItem }),
    onSuccess: (data, variables, context) => {
      setItems(() => data.data.items);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["list"] });
      }, 1000);
      // queryClient.cancelQueries({ queryKey: ["list"] });
      // queryClient.setQueryData(["list"], { items: data.data.items });
    },
    // onMutate:  (vars) => {
    //    queryClient.cancelQueries({ queryKey: ["list"] });
    //   queryClient.setQueryData(["list"], (prev: string[]) => [...prev, vars]);
    //   return vars;
    // },
  });
  useEffect(() => {
    //@ts-ignore
    if (listQuery.isPending && listQuery?.data?.items) {
      //@ts-ignore
      setItems(() => listQuery.data.items);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listQuery.data]);
  const itemList = useMemo(() => {
    if (!listQuery.data) {
      return <div> The list is Empty </div>;
    }
    return items.map((item, index) => <div key={index}>{item}</div>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listQuery.data, items]);
  return (
    <div className="">
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="h-10">
            <div>List</div>

            <input
              id="item"
              className="text-black"></input>
            <button
              type="button"
              onClick={() => {
                const newItem = (
                  document.getElementById("item") as HTMLInputElement
                ).value;
                listMutation.mutate(newItem);
              }}>
              추가
            </button>

            <div>{itemList}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lists;
