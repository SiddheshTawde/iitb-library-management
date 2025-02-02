"use client";

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn, formatISBN } from "@root/lib/utils";
import { Input } from "@root/components/ui/input";
import { Button } from "@root/components/ui/button";
import { addCategory, getCategories } from "@root/actions/categories.aciton";
import { addBookAction } from "@root/actions/add-book.action";
import { Popover, PopoverContent, PopoverTrigger } from "@root/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@root/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@root/components/ui/form";

export const newBookFormSchema = z.object({
  title: z.string().min(4).max(40),
  author: z.string().min(4).max(40),
  isbn: z.string().regex(/^\d{3}-\d-\d{4}-\d{4}-\d$/, "Invalid ISBN"),
  category: z.string(),
  cover: z.instanceof(File).refine((file) => file.type.startsWith("image/"), "Only images are allowed."),
});

export default function Page() {
  const [searchText, setSearchText] = React.useState("");
  const [categories, setCategories] = React.useState<{ id: string; name: string }[]>([]);
  const [isSubmitting, toggleSubmitting] = React.useState(false);

  React.useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((error) => {
        setCategories(error);
      });
  }, []);

  const form = useForm<z.infer<typeof newBookFormSchema>>({
    resolver: zodResolver(newBookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      isbn: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newBookFormSchema>) {
    const isSuccess = await addBookAction(values);
    toggleSubmitting(false);

    if (isSuccess) {
      // show success toast
      form.reset();
    } else {
      // show failure toast
    }
  }

  async function handleAddCategory() {
    const response = await addCategory(searchText);

    if (response.length > 0) {
      setCategories(response);
    }

    setSearchText("");
  }

  return (
    <main className="flex-1 container mx-auto px-4 flex gap-12 py-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => form.reset()} className="space-y-8 flex-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book title</FormLabel>
                <FormControl>
                  <Input {...field} disabled={field.disabled || isSubmitting} />
                </FormControl>
                <FormDescription>Name on the cover of the book.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Authors</FormLabel>
                <FormControl>
                  <Input {...field} disabled={field.disabled || isSubmitting} />
                </FormControl>
                <FormDescription>For multiple authors, use comma to separated values.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const fileList = e.target.files;
                      if (fileList && fileList.length > 0) {
                        form.resetField("cover");
                        field.onChange(fileList[0]);
                      }
                    }}
                    disabled={field.disabled || isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category / Genre</FormLabel>
                <FormControl className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                      >
                        {field.value
                          ? categories.find((category) => category.id === field.value)?.name
                          : "Category or genre"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search category or genre"
                          className="h-9 w-full"
                          value={searchText}
                          onChangeCapture={({ target }: React.ChangeEvent<HTMLInputElement>) => setSearchText(target.value)}
                        />
                        <CommandList>
                          <CommandEmpty className="p-2 flex items-center justify-between gap-4">
                            <span className="text-sm font-medium">Category does not exists.</span>
                            <Button type="button" onClick={handleAddCategory}>
                              Add to list
                            </Button>
                          </CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.id}
                                onSelect={() => {
                                  form.setValue("category", category.id);
                                }}
                              >
                                {category.name}
                                <Check
                                  className={cn("ml-auto", category.id === field.value ? "opacity-100" : "opacity-0")}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>For multiple categories, use comma to separated values.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="XXX-X-XXXX-XXXX-X"
                    disabled={field.disabled || isSubmitting}
                    onChange={(e) => field.onChange(formatISBN(e.target.value))}
                  />
                </FormControl>
                <FormDescription>13 digit ISBN number can be retrived from the publication.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center flex-row-reverse gap-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button variant="outline" type="reset" disabled={isSubmitting}>
              Reset
            </Button>
          </div>
        </form>
      </Form>

      <section className="flex-1 flex flex-col">
        <p className="font-medium">Preview:</p>

        <div className="flex flex-col gap-4 w-full border p-4 rounded flex-1">
          <div>
            {form.getValues("title") ? <p className="text-2xl font-bold">{form.getValues("title")}</p> : null}
            {form.getValues("author") ? <p className="text-base">By {form.getValues("author")}</p> : null}
          </div>

          <div>{form.getValues("cover") ? <img src={URL.createObjectURL(form.getValues("cover"))} /> : null}</div>
        </div>
      </section>
    </main>
  );
}
