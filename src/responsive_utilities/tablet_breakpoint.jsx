/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React from 'react';
import Breakpoint from './breakpoint';

export default function TabletBreakpoint(props) {
	return (
		<Breakpoint name="tablet">
			{props.children}
		</Breakpoint>
	);
}
