// React
import { useState } from "react";

// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Progress } from "../../../components/ui/progress";

//Hooks
import { useMultiStepForm } from "../hooks/useMultiStepForm";

// Serivces
import formsService from "../services/forms";

const formSchema = z.object({
  address: z.string().min(1),
  zip_code: z
    .string()
    .min(1)
    .max(5, "Zip code must be at most 5 characters long"),
});

/**
 * IntakeForm component renders a multi-step form for user intake.
 *
 *
 * @returns
 */
const IntakeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [formData, setFormData] = useState<z.infer<typeof formSchema>>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sections = [
    {
      title: "What is your address?",
      content: (
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#495057]">Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 Market St"
                  className="py-[1.8rem] rounded-[12px]"
                  type=""
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      ),
    },
    {
      title: "What is your zip code?",
      content: (
        <FormField
          control={form.control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#495057]">Zip Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="95129"
                  className="py-[1.8rem] rounded-[12px]"
                  type=""
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      ),
    },
  ];

  const { next, prev, index, section } = useMultiStepForm(sections);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await formsService.updateUser("1", data);
      setFormData(data);
      setSubmitted(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <section className="w-screen h-screen flex  flex-col items-center justify-center">
      {/* <Progress value={(sections.length / index) * 100} /> */}
      {!submitted && (
        <Form {...form}>
          <div className=" w-[30rem] h-[30rem]">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full mx-auto grid grid-rows-[5rem_1fr_4rem] gap-4 p-6"
            >
              {/* Header */}
              <h1 className="flex justify-center text-4xl font-bold mb-4 text-[#212529]">
                {section.title}
              </h1>

              {/* Content */}
              <div className="mb-4">{section.content}</div>

              {/* Footer */}
              <div className="flex justify-between">
                <button
                  onClick={prev}
                  disabled={index === 0}
                  className="px-4 py-2 bg-gray-300 disabled:opacity-50 rounded-[12px]"
                >
                  Previous
                </button>

                {index !== sections.length - 1 && (
                  <button
                    onClick={next}
                    className="px-4 py-2 bg-blue-500 text-white rounded-[12px]"
                  >
                    Next
                  </button>
                )}

                {index === sections.length - 1 && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#7755cc] font-semibold text-white rounded-[12px]"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </Form>
      )}

      {submitted && (
        <div
          style={{ boxShadow: `rgba(0, 0, 0, 0.18) 0px 2px 4px` }}
          className="flex flex-col p-8 items-center justify-center border border-[#868e96]"
        >
          <h2 className="text-2xl font-bold mb-4">
            Form Submitted Successfully!
          </h2>
          {formData && (
            <div className="w-full">
              <p className="">
                <strong>Address: </strong> {formData.address}
              </p>
              <p>
                <strong>Zip Code: </strong> {formData.zip_code}
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4">
          <p>Error: {error}</p>
        </div>
      )}
    </section>
  );
};

export default IntakeForm;
