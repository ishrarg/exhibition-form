import {
  Button,
  Container,
  TextInput,
  Card,
  Title,
  Grid,
  Textarea,
} from '@mantine/core';
import { useForm, useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';
import { Send } from 'tabler-icons-react';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

interface FormData {
  submittedBy?: string;
  name: string;
  companyName: string;
  email: string;
  interestedIn: string;
  business: string;
  couponInfo: string;
  remarks: string;
  mobileNo: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [submittedBy, setSubmittedBy] = useLocalStorage({
    key: 'submittedBy',
    defaultValue: '',
  });
  const form = useForm<FormData>({
    initialValues: {
      name: '',
      remarks: '',
      business: '',
      companyName: '',
      couponInfo: '',
      email: '',
      interestedIn: '',
      mobileNo: '',
    },
    validationRules: {
      mobileNo: value => isMobilePhone(value, 'en-IN'),
      email: value => isEmail(value) || value.length === 0,
    },
  });
  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    values.submittedBy = submittedBy;
    const res = await fetch(`http://localhost:5000/send/${values.mobileNo}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ values }),
    });
    const data = await res.json();
    if (data.success) {
      console.log(data.message);
    }
    setLoading(false);
  };
  return (
    <Container size='xs' px='xs'>
      <Card shadow='lg' p='xl' m='xl'>
        <Card.Section>
          <Title align='center'>BizFest Inquiry</Title>
        </Card.Section>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col md={6}>
              <TextInput
                label='Name'
                placeholder='Your name'
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label='Email'
                placeholder='Your email'
                type='email'
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label='Company Name'
                placeholder="Your company's name"
                {...form.getInputProps('companyName')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label='Business Category'
                placeholder='Your business category'
                {...form.getInputProps('business')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label='Coupon Info'
                placeholder='Coupon Info'
                {...form.getInputProps('couponInfo')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                label='Interested In'
                placeholder='Interested in'
                {...form.getInputProps('interestedIn')}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                required
                label='Submitted by'
                placeholder='Submitted by'
                value={submittedBy}
                onChange={e => setSubmittedBy(e.target.value)}
              />
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                required
                label='Mobile no.'
                placeholder='Your mobile number'
                type='number'
                {...form.getInputProps('mobileNo')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label='Remarks'
                placeholder='Remarks'
                {...form.getInputProps('remarks')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button
                style={{ width: '100%' }}
                color='red'
                radius='md'
                size='md'
                leftIcon={<Send />}
                type='submit'
                loading={loading}
              >
                Submit
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Card>
    </Container>
  );
}

export default App;
