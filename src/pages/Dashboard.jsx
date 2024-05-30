import MetricsCard from "../components/MetricsCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Piechart from "../components/Piechart";
import Barchart from "../components/Barchart";
import UpcomingInvoices from "../components/UpcomingInvoices";

const Dashboard = () => {
  const [schools, setSchools] = useState([]);

  const url = "https://schools-bsc2.onrender.com/schools";

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setSchools(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, schools]);

  const reloadData = () => {
    fetchData();
  };

  const getTotalCollections = () => {
    return schools.reduce(
      (total, school) =>
        total +
        school.collections.reduce(
          (schoolTotal, collection) => schoolTotal + collection.amount,
          0
        ),
      0
    );
  };
  const collections = getTotalCollections();

  const getTotalSchools = () => {
    return schools.length;
  };

  const schoolCount = getTotalSchools();

  function getTotalValidCollectionsAmount() {
    return schools.reduce((total, school) => {
      return (
        total +
        school.collections.reduce((schoolTotal, collection) => {
          return collection.status === "Valid"
            ? schoolTotal + collection.amount
            : schoolTotal;
        }, 0)
      );
    }, 0);
  }

  const revenue = getTotalValidCollectionsAmount();

  function countBouncedCollections() {
    return schools.reduce((totalCount, school) => {
      return (
        totalCount +
        school.collections.reduce((schoolCount, collection) => {
          return collection.status === "Bounced"
            ? schoolCount + 1
            : schoolCount;
        }, 0)
      );
    }, 0);
  }

  const bounced = countBouncedCollections();
  function countSchoolsWithAnalytics() {
    return schools.reduce((totalCount, school) => {
      return school.product === "Analytics" ? totalCount + 1 : totalCount;
    }, 0);
  }

  const analystics = countSchoolsWithAnalytics();

  function countSchoolsWithFinance() {
    return schools.reduce((totalCount, school) => {
      return school.product === "Finance" ? totalCount + 1 : totalCount;
    }, 0);
  }

  const finance = countSchoolsWithFinance();

  function countSchoolsWithTimetable() {
    return schools.reduce((totalCount, school) => {
      return school.product === "Timetable" ? totalCount + 1 : totalCount;
    }, 0);
  }

  const timetable = countSchoolsWithTimetable();

  function countSchoolsByTypeUsingAnalytics() {
    const counts = {
      primary: 0,
      secondary: 0,
      IGCSE: 0,
    };

    schools.forEach((school) => {
      if (school.product === "Analytics") {
        if (school.type === "Primary") {
          counts.primary++;
        } else if (school.type === "Secondary") {
          counts.secondary++;
        } else if (school.type === "IGCSE") {
          counts.IGCSE++;
        }
      }
    });

    return counts;
  }
  const { primary, secondary, IGCSE } = countSchoolsByTypeUsingAnalytics();

  function countSchoolsByTypeUsingFinance() {
    const financeCounts = {
      primaryFinance: 0,
      secondaryFinance: 0,
      IGCSEFinance: 0,
    };

    schools.forEach((school) => {
      if (school.product === "Finance") {
        if (school.type === "Primary") {
          financeCounts.primaryFinance++;
        } else if (school.type === "Secondary") {
          financeCounts.secondaryFinance++;
        } else if (school.type === "IGCSE") {
          financeCounts.IGCSEFinance++;
        }
      }
    });

    return financeCounts;
  }

  const { primaryFinance, secondaryFinance, IGCSEFinance } =
    countSchoolsByTypeUsingFinance();

  function countSchoolsByTypeUsingTimetable() {
    const timetableCounts = {
      primaryTimetable: 0,
      secondaryTimetable: 0,
      IGCSETimetable: 0,
    };

    schools.forEach((school) => {
      if (school.product === "Timetable") {
        if (school.type === "Primary") {
          timetableCounts.primaryTimetable++;
        } else if (school.type === "Secondary") {
          timetableCounts.secondaryTimetable++;
        } else if (school.type === "IGCSE") {
          timetableCounts.IGCSETimetable++;
        }
      }
    });

    return timetableCounts;
  }

  const { primaryTimetable, secondaryTimetable, IGCSETimetable } =
    countSchoolsByTypeUsingTimetable();

  const data = [
    {
      type: "collections",
      total: collections,
    },
    {
      type: "sign ups",
      total: schoolCount,
    },
    {
      type: "revenue",
      total: revenue,
    },
    {
      type: "bounced cheques",
      total: bounced,
    },
  ];

  const targets = [
    {
      name: "Zeraki Analytics",
      target: 10,
      achieved: analystics,
    },
    {
      name: "Zeraki Finance",
      target: 10,
      achieved: finance,
    },
    {
      name: "Zeraki Timetable",
      target: 10,
      achieved: timetable,
    },
  ];

  const products = [
    {
      name: "Zeraki Analytics",
      signups: {
        Primary: primary,
        Secondary: secondary,
        IGCSE: IGCSE,
      },
    },
    {
      name: "Zeraki Finance",
      signups: {
        Primary: primaryFinance,
        Secondary: secondaryFinance,
        IGCSE: IGCSEFinance,
      },
    },
    {
      name: "Zeraki Timetable",
      signups: {
        Primary: primaryTimetable,
        Secondary: secondaryTimetable,
        IGCSE: IGCSETimetable,
      },
    },
  ];
  return (
    <>
      <div
        className={`flex flex-col items-center md:flex-row my-10"
        }`}>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between flex-wrap p-2 ">
            {data.map((item, index) => (
              <MetricsCard key={index} type={item.type} total={item.total} />
            ))}
          </div>
          <div className="border shadow p-2 rounded-md  mx-5 flex flex-col flex-1 ">
            <h4 className="font-bold font-forum text-lg">Signups Overview</h4>
            <div className="flex flex-wrap flex-col md:flex-row justify-between items-center w-full">
              {products.map((item, index) => (
                <Barchart
                  name={item.name}
                  primary={item.signups.Primary}
                  secondary={item.signups.Secondary}
                  IGCSE={item.signups.IGCSE}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="border shadow w-80 md:w-60 p-2 rounded-md flex row md:flex-col mt-5 md:mt-10 items-start md:items-center">
          <h4 className="font-bold font-forum text-lg">Targets</h4>
          <div className=" flex flex-col flex-wrap">
            {targets.map((item, index) => (
              <Piechart
                key={index}
                name={item.name}
                target={item.target}
                achieved={item.achieved}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <UpcomingInvoices reloadData={reloadData} />
      </div>
    </>
  );
};

export default Dashboard;
