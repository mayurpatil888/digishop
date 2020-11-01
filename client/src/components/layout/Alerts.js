import React from "react";
import {connect} from "react-redux";

const Alert = ({alerts}) => {
  return alerts && alerts.length > 0 && alerts.map((alert)=> {
    return <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  })
};

const mapStateToProps = state => ({alerts: state.alerts});

export default connect(mapStateToProps)(Alert);