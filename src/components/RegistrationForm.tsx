import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().trim().min(1, "Nama lengkap wajib diisi").max(100),
  email: z.string().trim().email("Email tidak valid").max(255),
  phone: z.string().trim().min(10, "Nomor telepon minimal 10 digit").max(15),
  program: z.enum(["calligraphy", "graphic_design", "english", "arabic", "al_azhar_turkey_central_asia"], {
    required_error: "Pilih program yang diinginkan",
  }),
  education_level: z.string().trim().min(1, "Jenjang pendidikan wajib diisi").max(50),
  address: z.string().trim().min(10, "Alamat minimal 10 karakter").max(500),
  parent_name: z.string().trim().max(100).optional(),
  parent_phone: z.string().trim().max(15).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const programOptions = [
  { value: "calligraphy", label: "Kelas Calistung - Rp. 400.000" },
  { value: "graphic_design", label: "Kelas Desain Grafis - Rp. 700.000" },
  { value: "english", label: "Kelas Bahasa Inggris - Rp. 700.000" },
  { value: "arabic", label: "Kelas Bahasa Arab - Rp. 700.000" },
  { value: "al_azhar_turkey_central_asia", label: "Kelas Al-Azhar, Turki & Asia Tengah - Rp. 6.500.000" },
];

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      education_level: "",
      address: "",
      parent_name: "",
      parent_phone: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const registrationData = {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        program: values.program,
        education_level: values.education_level,
        address: values.address,
        parent_name: values.parent_name || null,
        parent_phone: values.parent_phone || null,
      };

      const { error } = await supabase
        .from("registrations")
        .insert([registrationData]);

      if (error) throw error;

      toast.success("Pendaftaran berhasil!", {
        description: "Terima kasih telah mendaftar. Kami akan segera menghubungi Anda.",
      });
      form.reset();
    } catch (error: any) {
      toast.error("Pendaftaran gagal", {
        description: error.message || "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary mb-2">
              Form Pendaftaran
            </CardTitle>
            <CardDescription className="text-lg">
              Isi formulir di bawah ini untuk mendaftar program bimbingan belajar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap *</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="nama@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. Telepon *</FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pilih Program *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih program yang diinginkan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {programOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="education_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenjang Pendidikan *</FormLabel>
                      <FormControl>
                        <Input placeholder="SD/SMP/SMA/Mahasiswa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat Lengkap *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan alamat lengkap"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 text-muted-foreground">
                    Data Orang Tua / Wali (Opsional)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="parent_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Orang Tua / Wali</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama orang tua" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="parent_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No. Telepon Orang Tua</FormLabel>
                          <FormControl>
                            <Input placeholder="08xxxxxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Daftar Sekarang"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationForm;