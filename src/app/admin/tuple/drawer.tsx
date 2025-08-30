"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { client } from "@/services/connect/client";


const schema = z.object({
  subjectNs: z.string().min(1, "Subject namespace is required"),
  subjectId: z.string().min(1, "Subject id is required"),
  relation: z.string().min(1, "Relation is required"),
  objectNs: z.string().min(1, "Object namespace is required"),
  objectId: z.string().min(1, "Subject id is required"),
});

type FormData = z.infer<typeof schema>;

export function CreateTupleDrawer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      toast.success("Tuple created successfully!");
      const out = await client.createTuple({
        sbjNs: data.subjectNs,
        sbjId: data.subjectId,
        rel: data.relation,
        objNs: data.objectNs,
        objId: data.objectId,
      });

      console.log("Submitted Tuple:", out); // Use `out` to inspect response
      toast.success("Tuple created successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to create tuple.");
      console.error("Error submitting tuple:", error);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" className="bg-violet-800">+ Create</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Tuple</DrawerTitle>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <Input placeholder="user" {...register("subjectNs")} />
            {errors.subjectNs && <p className="text-red-500 text-sm">{errors.subjectNs.message}</p>}
          </div>
          <div>
            <Input placeholder="alice" {...register("subjectId")} />
            {errors.subjectId && <p className="text-red-500 text-sm">{errors.subjectId.message}</p>}
          </div>
          <div>
            <Input placeholder="member" {...register("relation")} />
            {errors.relation && <p className="text-red-500 text-sm">{errors.relation.message}</p>}
            {/* <Select onValueChange={(value) => setValue("relation", value)}>
              <SelectTrigger>Choose Relation</SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
              </SelectContent>
            </Select>
            {errors.relation && <p className="text-red-500 text-sm">{errors.relation.message}</p>} */}
          </div>
          <div>
            <Input placeholder="role" {...register("objectNs")} />
            {errors.objectNs && <p className="text-red-500 text-sm">{errors.objectNs.message}</p>}
          </div>
          <div>
            <Input placeholder="admin" {...register("objectId")} />
            {errors.objectId && <p className="text-red-500 text-sm">{errors.objectId.message}</p>}
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
