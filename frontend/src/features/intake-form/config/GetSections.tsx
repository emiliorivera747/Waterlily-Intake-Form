import type { Control, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

export const getSections = (control: Control<FieldValues>) => {
  return [
    {
      title: "What is your address?",
      content: (
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#495057]">Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
    {
      title: "What is your zip code?",
      content: (
        <FormField
          control={control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#495057]">Zip Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your zip code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ),
    },
  ];
};
