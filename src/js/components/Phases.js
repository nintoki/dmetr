import React from 'react';
import { Component } from 'react';

export default class Phases extends Component {
	render() {
		let phase = this.props.phase;
    return (
			<div>
				<div className={ (phase.op1_1 == 1 && phase.op1_2 == 1 && phase.op1_3 == 1 && phase.op1_4 == 1 && phase.op1_5 == 1 ) ? "hidden" : "op1-min" }>
					<div className="opdiv-min">
						<div className="optit">Demo</div>
						<div className={phase.op1_1 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">Ins</div>
						<div className={phase.op1_2 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">EOB</div>
						<div className={phase.op1_3 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">oRx</div>
						<div className={phase.op1_4 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">Meas</div>
						<div className={phase.op1_5 == 1 ? "op-comp" : "op-open"}></div>
					</div>
				</div>
				<div className={ (phase.op1_1 == 0 || phase.op1_2 == 0 || phase.op1_3 == 0 || phase.op1_4 == 0 || phase.op1_5 == 0 || phase.op1_1 == 1 && phase.op1_2 == 1 && phase.op1_3 == 1 && phase.op1_4 == 1 && phase.op1_5 == 1 && phase.op2_1 == 1 && phase.op2_2 == 1 && phase.op2_3 == 1 && phase.op2_4 == 1) ? "hidden" : "op2-min"}>
					<div className="opdiv-min">
						<div className="optit">Rx</div>
						<div className={phase.op2_1 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">LMN</div>
						<div className={phase.op2_2 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">Note</div>
						<div className={phase.op2_3 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">Auth</div>
						<div className={phase.op2_4 == 1 ? "op-comp" : "op-open"}></div>
					</div>
				</div>
				<div className={(phase.op1_1 == 0 || phase.op1_2 == 0 || phase.op1_3 == 0 || phase.op1_4 == 0 || phase.op1_5 == 0 || phase.op2_1 == 0 || phase.op2_2 == 0 || phase.op2_3 == 0 || phase.op2_4 == 0 || phase.op3_1 == 1 && phase.op3_2 == 1 && phase.op3_3 == 1 && phase.op3_4 == 1 ) ? "hidden" : "op3-min" }>
					<div className="opdiv-min">
						<div className="optit">Ordr</div>
						<div className={phase.op3_1 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">Dstb</div>
						<div className={phase.op3_2 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">Tckt</div>
						<div className={phase.op3_3 == 1 ? "op-comp" : "op-open"}></div>
					</div>
					<div className="opdiv-min">
						<div className="optit">Bill</div>
						<div className={phase.op3_4 == 1 ? "op-comp" : "op-open"}></div>
					</div>
				</div>
				<div className={(phase.op1_1 == 1 && phase.op1_2 == 1 && phase.op1_3 == 1 && phase.op1_4 == 1 && phase.op1_5 == 1 && phase.op2_1 == 1 && phase.op2_2 == 1 && phase.op2_3 == 1 && phase.op2_4 == 1 && phase.op3_1 == 1 && phase.op3_2 == 1 && phase.op3_3 == 1 && phase.op3_4 == 1 ) ? "" : "hidden" }><b className="red">Completed - Please archive</b></div>
			</div>
    );
  }
}
