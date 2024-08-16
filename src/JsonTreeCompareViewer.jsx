import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronRight, Copy, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

const JsonNode = ({ data, otherData, path = [], isLeft }) => {
  const [isExpanded, setIsExpanded] = useState(path.length < 2);

  if (typeof data !== 'object' || data === null) {
    const isDifferent = data !== otherData;
    const className = isDifferent
      ? isLeft
        ? 'text-red-600 font-semibold'
        : 'text-blue-600 font-semibold'
      : 'text-green-600';
    return <span className={className}>{JSON.stringify(data)}</span>;
  }

  const isArray = Array.isArray(data);
  const entries = Object.entries(data);

  return (
    <div className="ml-4 border-l-2 border-gray-200 pl-2">
      <span
        className="cursor-pointer inline-flex items-center hover:bg-gray-100 rounded px-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        <span className="ml-1 text-gray-700">{isArray ? '[]' : '{}'}</span>
      </span>
      {isExpanded && (
        <div>
          {entries.map(([key, value]) => {
            const newPath = [...path, key];
            const otherValue = otherData && typeof otherData === 'object' ? otherData[key] : undefined;
            const isDifferent = !otherData || !(key in otherData);
            const className = isDifferent
              ? isLeft
                ? 'text-red-600 font-semibold'
                : 'text-blue-600 font-semibold'
              : 'text-gray-700';
            return (
              <div key={key} className="my-1">
                <span className={className}>{isArray ? key : `"${key}":`}</span>{' '}
                <JsonNode
                  data={value}
                  otherData={otherValue}
                  path={newPath}
                  isLeft={isLeft}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const JsonTreeCompareViewer = () => {
  const [leftJson, setLeftJson] = useState('');
  const [rightJson, setRightJson] = useState('');
  const [parsedLeft, setParsedLeft] = useState(null);
  const [parsedRight, setParsedRight] = useState(null);
  const [error, setError] = useState('');

  const handleCompare = () => {
    try {
      setParsedLeft(JSON.parse(leftJson));
      setParsedRight(JSON.parse(rightJson));
      setError('');
    } catch (e) {
      setError('Invalid JSON input. Please check your JSON and try again.');
    }
  };

  const handleCopy = (side) => {
    navigator.clipboard.writeText(side === 'left' ? leftJson : rightJson);
  };

  const handleClear = (side) => {
    if (side === 'left') {
      setLeftJson('');
      setParsedLeft(null);
    } else {
      setRightJson('');
      setParsedRight(null);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">JSON Tree Compare Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <div className="mb-2 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Left JSON</h3>
                <div>
                  <Button variant="outline" size="sm" onClick={() => handleCopy('left')} className="mr-2">
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleClear('left')}>
                    <RefreshCw className="h-4 w-4 mr-1" /> Clear
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full h-40 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={leftJson}
                onChange={(e) => setLeftJson(e.target.value)}
                placeholder="Enter left JSON here"
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-2 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Right JSON</h3>
                <div>
                  <Button variant="outline" size="sm" onClick={() => handleCopy('right')} className="mr-2">
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleClear('right')}>
                    <RefreshCw className="h-4 w-4 mr-1" /> Clear
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full h-40 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={rightJson}
                onChange={(e) => setRightJson(e.target.value)}
                placeholder="Enter right JSON here"
              />
            </div>
          </div>
          <Button onClick={handleCompare} className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors">
            Compare
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {parsedLeft && parsedRight && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Comparison Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-semibold mb-2">Left JSON</h3>
                <div className="border rounded p-4 bg-gray-50">
                  <JsonNode data={parsedLeft} otherData={parsedRight} isLeft={true} />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-semibold mb-2">Right JSON</h3>
                <div className="border rounded p-4 bg-gray-50">
                  <JsonNode data={parsedRight} otherData={parsedLeft} isLeft={false} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Legend</h3>
        <div className="grid grid-cols-2 gap-2">
          <div><span className="inline-block w-4 h-4 bg-red-600 mr-2"></span>Extra data in left JSON</div>
          <div><span className="inline-block w-4 h-4 bg-blue-600 mr-2"></span>Extra data in right JSON</div>
          <div><span className="inline-block w-4 h-4 bg-green-600 mr-2"></span>Matching primitive values</div>
          <div><span className="inline-block w-4 h-4 bg-gray-700 mr-2"></span>Matching keys or array indices</div>
        </div>
      </div>
    </div>
  );
};

export default JsonTreeCompareViewer;