import Layout from "../../shared/components/Layout";
import TopNavBar from "../../shared/components/TopNavBar";
import RankingDashboard from "./components/RankingDashboard";
import RecentRecommendedList from "./components/RecentRecommendedList";
import RecommendSection from "./components/RecommendSection";

const MainPage = () => {
  return (
    <>
      <TopNavBar />
      <Layout>
        <div className="flex gap-4">
          <div className="flex-1">
            <RecommendSection />
          </div>
          <div style={{ width: '320px' }}>
            <RankingDashboard />
            <div className="h-8" />
            <RecentRecommendedList />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MainPage;