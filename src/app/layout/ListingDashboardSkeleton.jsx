import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ListingDashboardSkeleton() {
  return (
    <div className="row  ml-auto mr-auto">
      <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <Skeleton height={250} />
      </div>
      <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <Skeleton height={250} />
      </div>
      <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <Skeleton height={250} />
      </div>
      <div className="col-6 col-sm-6 col-md-4 col-lg-3">
        <Skeleton height={250} />
      </div>
    </div>
  );
}
