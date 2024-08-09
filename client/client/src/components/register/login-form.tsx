'use client';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaRegUser } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useFormik } from 'formik';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';

export function LoginForm() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Tabs defaultValue="login" className="p-2">
      <TabsList className=" w-full text-center space-x-4  flex justify-center items-center">
        <TabsTrigger className="text-2xl font-bold " value="login">
          <FaRegUser />
          Sign in
        </TabsTrigger>
        <span className="h-10 border border-black" />
        <TabsTrigger className="text-2xl font-bold " value="register">
          <FaRegUser />
          Sign up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form onSubmit={formik.handleSubmit} className="space-y-5 mt-10">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="text-end pr-4">
            <Link href={'/forget'}>Forget Passowrd?</Link>
          </div>
          <Button type="submit" variant={'login'} className="w-full h-[76px]">
            Login to Contunue
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="register">
        <form onSubmit={formik.handleSubmit} className="space-y-5 mt-10">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Input
            id="phone"
            name="phone"
            type="phone"
            placeholder="Enter Phone Number"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="flex items-center space-x-2 px-9">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          <Button type="submit" variant={'login'} className="w-full h-[76px]">
            Login to Contunue
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
