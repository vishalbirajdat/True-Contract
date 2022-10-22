import CreateToken from "../components/component/CreateToken";
import EarnToken from "../components/component/EarnToken";
import Hero from "../components/component/Hero";
import TableHistory from "../components/component/TableHistory";
import Title from "../components/component/utils/Title";
import Layout from "../components/utils/Layout";

export default function Home() {
  return (
    <Layout>
      <div>
        <Hero />
        <Title subTitle={""} title1={"Create"} title2={"Ticket"} />
        <CreateToken />
        <Title subTitle={""} title1={"Earn"} title2={"Token"} />
        <EarnToken />
        <Title subTitle={""} title1={"Last"} title2={"history"} />
        <TableHistory />
      </div>
    </Layout>
  )
}